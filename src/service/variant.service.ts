import context from "../lib/context";
import {
  AddVariantAttributeDto,
  CreateVariantDto,
  DeleteVariantDto,
  QueryVariantsDto,
  RemoveVariantAttributeDto,
  UpdateVariantDto,
  VariantAttributeResponseDto,
  VariantResponseDto
} from "../dto/variant.dto";
import moment from "moment";
import { Variant } from "../db/entity/variant";

export async function mapVariantToDto(variant: Variant): Promise<VariantResponseDto> {
  const offerEndDate = moment(variant.offerEnd).toISOString();
  const attributes = (variant.attributes) ? (await variant.attributes).map(a => {
    return <VariantAttributeResponseDto>{
      attributeId: a.attributeId,
      value: a.value
    };
  }) : [];
  return <VariantResponseDto>{
    id: variant.id,
    price: variant.price,
    stock: variant.stock,
    discount: variant.discount,
    productId: variant.productId,
    image: variant.image,
    offerEnd: offerEndDate,
    attributes: attributes
  };
}

export async function createVariant(createVariantDto: CreateVariantDto) {
  try {
    const offerEndDate = createVariantDto.offerEnd ? moment(createVariantDto.offerEnd).toDate() : undefined;
    const variant = await context.db.variantRepository.save({
      ...createVariantDto,
      offerEnd: offerEndDate
    });
    return await mapVariantToDto(variant);
  } catch (e) {
    context.logger.warn(e);
    throw new Error("variant could not be created!");
  }
}

export async function updateVariant(updateVariantDto: UpdateVariantDto) {
  try {
    const offerEndDate = updateVariantDto.offerEnd ? moment(updateVariantDto.offerEnd).toDate() : undefined;
    const { id, ...updateObj } = updateVariantDto;
    const variant = await context.db.variantRepository.findOne(id);
    if (!variant) {
      throw new Error("variant not found!");
    }
    Object.keys(updateObj).forEach(k => {
      (variant as any)[k] = (updateObj as any)[k];
    });
    if (offerEndDate)
      variant.offerEnd = offerEndDate;
    const updatedVariant = await context.db.variantRepository.save(variant);
    return await mapVariantToDto(updatedVariant);
  } catch (e) {
    context.logger.warn(e);
    throw new Error("variant could not be updated!");
  }
}

export async function deleteVariant(deleteVariantDto: DeleteVariantDto) {
  try {
    const deleteResult = await context.db.variantRepository.delete(deleteVariantDto.id);
    if (deleteResult.affected == 1) {
      return;
    }
    throw new Error("variant not found!");
  } catch (e) {
    context.logger.warn(e);
    throw new Error("variant could not be deleted!");
  }
}

export async function queryVariants(queryVariantsDto: QueryVariantsDto) {
  try {
    const variants = await context.db.variantRepository.find();
    return await Promise.all(variants.map(async variant => {
      return await mapVariantToDto(variant);
    }));
  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not query variants!");
  }
}

export async function getVariantById(variantId: number) {
  try {
    const variant = await context.db.variantRepository.findOne(variantId);
    if (!variant) {
      throw new Error("variant not found!");
    }
    return await mapVariantToDto(variant);
  } catch (e) {
    context.logger.warn(e);
    throw new Error("variant not found!");
  }
}

export async function addVariantAttribute(addVariantAttributeDto: AddVariantAttributeDto) {
  try {
    const [variant, attribute, variantAttribute] = await Promise.all([
      context.db.variantRepository.findOne(addVariantAttributeDto.variantId),
      context.db.attributeRepository.findOne(addVariantAttributeDto.attributeId),
      context.db.variantAttributeRepository.findOne({
        attributeId: addVariantAttributeDto.attributeId,
        variantId: addVariantAttributeDto.variantId
      })
    ]);
    if (!variant) {
      throw new Error("variant not found!");
    }
    if (!attribute) {
      throw new Error("attribute not found!");
    }
    if (variantAttribute) {
      variantAttribute.value = addVariantAttributeDto.value;
      await context.db.variantAttributeRepository.save(variantAttribute);
      return;
    }
    const newVariantAttribute = context.db.variantAttributeRepository.create({
      variant: variant,
      attribute: attribute,
      value: addVariantAttributeDto.value
    });
    await context.db.variantAttributeRepository.save(newVariantAttribute);
  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not add variant attribute!");
  }
}

export async function removeVariantAttribute(removeVariantAttributeDto: RemoveVariantAttributeDto) {
  try {
    await context.db.variantAttributeRepository.delete({
      variantId: removeVariantAttributeDto.variantId,
      attributeId: removeVariantAttributeDto.attributeId
    });
  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not remove variant attribute!");
  }
}
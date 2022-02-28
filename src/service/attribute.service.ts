import context from "../lib/context";
import { AttributeResponseDto, CreateAttributeDto, DeleteAttributeDto, QueryAttributesDto, UpdateAttributeDto } from "../dto/attribute.dto";

export async function createAttribute(createAttributeDto: CreateAttributeDto) {
  try {
    const attribute = await context.db.attributeRepository.save({
      ...createAttributeDto
    });
    return <AttributeResponseDto>{
      ...attribute
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("attribute could not be created!");
  }
}

export async function updateAttribute(updateAttributeDto: UpdateAttributeDto) {
  try {
    const { id, ...updateObj } = updateAttributeDto;
    const attribute = await context.db.attributeRepository.findOne(id);
    if (!attribute) {
      throw new Error("attribute not found!");
    }
    Object.keys(updateObj).forEach(k => {
      (attribute as any)[k] = (updateObj as any)[k];
    });
    const updatedAttribute = await context.db.attributeRepository.save(attribute);
    return <AttributeResponseDto>{
      ...updatedAttribute
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("attribute could not be updated!");
  }
}

export async function deleteAttribute(deleteAttributeDto: DeleteAttributeDto) {
  try {
    const deleteResult = await context.db.attributeRepository.delete(deleteAttributeDto.id);
    if (deleteResult.affected == 1) {
      return;
    }
    throw new Error("attribute not found!");
  } catch (e) {
    context.logger.warn(e);
    throw new Error("attribute could not be deleted!");
  }
}

export async function queryAttributes(queryAttributesDto: QueryAttributesDto) {
  try {
    const attributes = await context.db.attributeRepository.find();
    return attributes.map(u => {
      return <AttributeResponseDto>{
        ...u
      };
    });
  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not query attributes!");
  }
}

export async function getAttributeById(attributeId: number) {
  try {
    const attribute = await context.db.attributeRepository.findOne(attributeId);
    if (!attribute) {
      throw new Error("attribute not found!");
    }
    return <AttributeResponseDto>{
      ...attribute
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("attribute not found!");
  }
}
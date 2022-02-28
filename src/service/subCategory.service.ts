import context from "../lib/context";
import {
  CreateSubCategoryDto,
  DeleteSubCategoryAttributeDto,
  DeleteSubCategoryDto,
  LinkSubCategoryAttributeDto, QuerySubCategoriesByCategories,
  QuerySubCategoriesDto,
  SubCategoryResponseDto,
  UpdateSubCategoryDto
} from "../dto/subCategory.dto";
import { OrderedAttributeResponseDto } from "../dto/attribute.dto";
import {ResponsePromoCodeDto} from "../dto/promocode.dto";

export async function createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
  try {
    const subCategory = await context.db.subCategoryRepository.save({
      ...createSubCategoryDto
    });
    return <SubCategoryResponseDto>{
      id: subCategory.id,
      name: subCategory.name,
      category: subCategory.categoryId
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("subCategory could not be created!");
  }
}

export async function updateSubCategory(updateSubCategoryDto: UpdateSubCategoryDto) {
  try {
    const { id, ...updateObj } = updateSubCategoryDto;
    const subCategory = await context.db.subCategoryRepository.findOne(id);
    if (!subCategory) {
      throw new Error("subCategory not found!");
    }
    Object.keys(updateObj).forEach(k => {
      (subCategory as any)[k] = (updateObj as any)[k];
    });
    const updatedSubCategory = await context.db.subCategoryRepository.save(subCategory);
    return <SubCategoryResponseDto>{
      id: updatedSubCategory.id,
      name: updatedSubCategory.name,
      category: updatedSubCategory.categoryId
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("subCategory could not be updated!");
  }
}

export async function deleteSubCategory(deleteSubCategoryDto: DeleteSubCategoryDto) {
  try {
    const deleteResult = await context.db.subCategoryRepository.delete(deleteSubCategoryDto.id);
    if (deleteResult.affected == 1) {
      return;
    }
    throw new Error("subCategory not found!");
  } catch (e) {
    context.logger.warn(e);
    throw new Error("subCategory could not be deleted!");
  }
}

export async function querySubCategories(querySubCategoriesDto: QuerySubCategoriesDto) {
  try {
    const subCategories = await context.db.subCategoryRepository.find({ relations: ["category", "attributes", "attributes.attribute"] });
    return await Promise.all(subCategories.map(async subCategory => {
      const attributes = (await subCategory.attributes).map(attribute => {
        return <OrderedAttributeResponseDto>{
          id: attribute.attribute.id,
          name: attribute.attribute.name,
          type: attribute.attribute.type,
          order: attribute.order
        };
      });
      return <SubCategoryResponseDto>{
        id: subCategory.id,
        name: subCategory.name,
        category: {
          id: subCategory.category.id,
          name: subCategory.category.name
        },
        attributes: attributes
      };
    }));
  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not query subCategories!");
  }
}

export async function getSubCategoryById(subCategoryId: number) {
  try {
    const subCategory = await context.db.subCategoryRepository.findOne(subCategoryId, { relations: ["category", "attributes", "attributes.attribute"] });
    if (!subCategory) {
      throw new Error("subCategory not found!");
    }
    const attributes = (await subCategory.attributes).map(attribute => {
      return <OrderedAttributeResponseDto>{
        id: attribute.attribute.id,
        name: attribute.attribute.name,
        type: attribute.attribute.type,
        order: attribute.order
      };
    });
    return <SubCategoryResponseDto>{
      id: subCategory.id,
      name: subCategory.name,
      category: {
        id: subCategory.category.id,
        name: subCategory.category.name
      },
      attributes: attributes
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("subCategory not found!");
  }
}

export async function linkSubCategoryAttribute(linkSubCategoryAttributeDto: LinkSubCategoryAttributeDto) {
  try {
    const [subCategory, attribute] = await Promise.all([
      context.db.categoryRepository.findOne(linkSubCategoryAttributeDto.subCategoryId),
      context.db.attributeRepository.findOne(linkSubCategoryAttributeDto.attributeId)
    ]);
    if (!subCategory) {
      throw new Error("subCategory not found!");
    }
    if (!attribute) {
      throw new Error("attribute not found!");
    }

    const res = await context.db.subCategoryAttributeRepository.createQueryBuilder("subCatAttr")
      .select("MAX(subCatAttr.order)", "lastOrder")
      .where("subCatAttr.subCategoryId = :subCatId", { subCatId: subCategory.id })
      .getRawOne();
    const lastOrder = res.lastOrder ? (res.lastOrder + 1) : 1;
    if (!linkSubCategoryAttributeDto.order) {
      linkSubCategoryAttributeDto.order = lastOrder;
    }

    const subCatAttr = await context.db.subCategoryAttributeRepository.findOne({
      subCategoryId: subCategory.id,
      attributeId: attribute.id
    });
    if (subCatAttr) {
      subCatAttr.order = linkSubCategoryAttributeDto.order;
      await context.db.subCategoryAttributeRepository.save(subCatAttr);
      return;
    }

    const subCatAttrNew = await context.db.subCategoryAttributeRepository.create({
      subCategory: subCategory,
      attribute: attribute,
      order: linkSubCategoryAttributeDto.order
    });
    await context.db.subCategoryAttributeRepository.save(subCatAttrNew);

  } catch (e) {
    context.logger.warn(e);
    throw new Error("subCategory attribute could not be linked!");
  }
}

export async function deleteSubCategoryAttribute(deleteSubCategoryAttributeDto: DeleteSubCategoryAttributeDto) {
  try {
    await context.db.subCategoryAttributeRepository.delete({
      subCategoryId: deleteSubCategoryAttributeDto.subCategoryId,
      attributeId: deleteSubCategoryAttributeDto.attributeId
    });
  } catch (e) {
    context.logger.warn(e);
    throw new Error("subCategory attribute could not be deleted!");
  }
}



export async function querySubCategoryByCategoryId(categoryId:number){

  try {
    const subCategoryByCategory = await context.db.subCategoryRepository.createQueryBuilder("sub_categories")
        .where("sub_categories.categoryId = :CategoryId",{CategoryId:categoryId})
        .getManyAndCount()

    console.log(subCategoryByCategory[0])
    if (!subCategoryByCategory) {
      throw new Error("promo code not found!");
    }else {
      const result = {
        result:subCategoryByCategory[0]
      }
      return result as QuerySubCategoriesByCategories;
    }

  }catch (e) {
    context.logger.warn(e);
    throw new Error("could not query coupons!");
  }
}
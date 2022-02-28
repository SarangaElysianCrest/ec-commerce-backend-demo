import context from "../lib/context";
import {
  CategoryResponseDto,
  CreateCategoryDto, DeleteCategoryAttributeDto,
  DeleteCategoryDto,
  LinkCategoryAttributeDto,
  QueryCategoriesDto,
  UpdateCategoryDto
} from "../dto/category.dto";
import { AttributeResponseDto, OrderedAttributeResponseDto } from "../dto/attribute.dto";


export async function createCategory(createCategoryDto: CreateCategoryDto) {
  try {
    const category = await context.db.categoryRepository.save({
      ...createCategoryDto
    });
    return <CategoryResponseDto>{
      id: category.id,
      name: category.name
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("category could not be created!");
  }
}

export async function updateCategory(updateCategoryDto: UpdateCategoryDto) {
  try {
    const { id, ...updateObj } = updateCategoryDto;
    const category = await context.db.categoryRepository.findOne(id);
    if (!category) {
      throw new Error("category not found!");
    }
    Object.keys(updateObj).forEach(k => {
      (category as any)[k] = (updateObj as any)[k];
    });
    const updatedCategory = await context.db.categoryRepository.save(category);
    return <CategoryResponseDto>{
      id: updatedCategory.id,
      name: updatedCategory.name
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("category could not be updated!");
  }
}

export async function deleteCategory(deleteCategoryDto: DeleteCategoryDto) {
  try {
    const deleteResult = await context.db.categoryRepository.delete(deleteCategoryDto.id);
    if (deleteResult.affected == 1) {
      return;
    }
    throw new Error("category not found!");
  } catch (e) {
    context.logger.warn(e);
    throw new Error("category could not be deleted!");
  }
}

export async function queryCategories(queryCategoriesDto: QueryCategoriesDto) {
  try {
    const categories = await context.db.categoryRepository.find({ relations: ['attributes', 'attributes.attribute'] });
    return await Promise.all(categories.map(async category => {
      const attributes = await category.attributes;
      return <CategoryResponseDto>{
        id: category.id,
        name: category.name,
        attributes: attributes.map(a => {
          return <OrderedAttributeResponseDto> {
            id: a.attribute.id,
            name: a.attribute.name,
            type: a.attribute.type,
            order: a.order
          }
        })
      };
    }));
  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not query categories!");
  }
}

export async function getCategoryById(categoryId: number) {
  try {
    const category = await context.db.categoryRepository.findOne(categoryId, { relations: ['attributes', 'attributes.attribute'] });
    if (!category) {
      throw new Error("category not found!");
    }
    const attributes = await category.attributes;
    return <CategoryResponseDto>{
      id: category.id,
      name: category.name,
      attributes: attributes.map(a => {
        return <OrderedAttributeResponseDto> {
          id: a.attribute.id,
          name: a.attribute.name,
          type: a.attribute.type,
          order: a.order
        }
      })
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("category not found!");
  }
}

export async function linkCategoryAttribute(linkCategoryAttributeDto: LinkCategoryAttributeDto) {
  try {
    const [category, attribute] = await Promise.all([
      context.db.categoryRepository.findOne(linkCategoryAttributeDto.categoryId),
      context.db.attributeRepository.findOne(linkCategoryAttributeDto.attributeId)
    ]);
    if (!category) {
      throw new Error("category not found!");
    }
    if (!attribute) {
      throw new Error("attribute not found!");
    }

    const res = await context.db.categoryAttributeRepository.createQueryBuilder("catAttr")
      .select("MAX(catAttr.order)", "lastOrder")
      .where("catAttr.categoryId = :catId", { catId: category.id })
      .getRawOne();
    const lastOrder = res.lastOrder ? (res.lastOrder + 1) : 1;
    if (!linkCategoryAttributeDto.order) {
      linkCategoryAttributeDto.order = lastOrder;
    }

    const catAttr = await context.db.categoryAttributeRepository.findOne({
      categoryId: category.id,
      attributeId: attribute.id
    });
    if (catAttr) {
      catAttr.order = linkCategoryAttributeDto.order;
      await context.db.categoryAttributeRepository.save(catAttr);
      return;
    }

    const catAttrNew = await context.db.categoryAttributeRepository.create({
      category: category,
      attribute: attribute,
      order: linkCategoryAttributeDto.order
    });
    await context.db.categoryAttributeRepository.save(catAttrNew);

  } catch (e) {
    context.logger.warn(e);
    throw new Error("category attribute could not be linked!");
  }
}

export async function deleteCategoryAttribute(deleteCategoryAttributeDto: DeleteCategoryAttributeDto) {
  try {
    await context.db.categoryAttributeRepository.delete({
      categoryId: deleteCategoryAttributeDto.categoryId,
      attributeId: deleteCategoryAttributeDto.attributeId
    })
  } catch (e) {
    context.logger.warn(e);
    throw new Error("category attribute could not be deleted!");
  }
}

import context from "../lib/context";
import {
  CreateProductDto,
  DeleteProductDto,
  LinkProductTagDto,
  ProductListResponseDto,
  ProductResponseDto,
  QueryProductsDto,
  RemoveLinkProductTagDto,
  UpdateProductDto
} from "../dto/product.dto";
import moment from "moment";
import { TagResponseDto } from "../dto/tag.dto";
import { Product } from "../db/entity/product";
import { OrderedAttributeResponseDto } from "../dto/attribute.dto";
import { ProductImageResponseDto } from "../dto/productImage.dto";
import { mapVariantToDto } from "./variant.service";

async function mapProductToDto(product: Product): Promise<ProductResponseDto> {


  const offerEndDate = moment(product.offerEnd).toISOString();

  const tags = (product.tags) ? (await product.tags).map(t => {
    return <TagResponseDto>{
      id: t.id,
      name: t.name
    };
  }) : [];

  const categoryAttributes = (product.category && product.category.attributes) ? (await product.category.attributes).map(a => {
    return <OrderedAttributeResponseDto>{
      id: a.attribute.id,
      name: a.attribute.name,
      order: a.order,
      type: a.attribute.type
    };
  }) : [];

  const subCategoryAttributes = (product.subCategory && product.subCategory.attributes) ? (await product.subCategory.attributes).map(a => {
    return <OrderedAttributeResponseDto>{
      id: a.attribute.id,
      name: a.attribute.name,
      order: a.order,
      type: a.attribute.type
    };
  }) : [];

  const images = (product.images) ? (await product.images).map(image => {
    return <ProductImageResponseDto>{
      id: image.id,
      url: image.url
    };
  }) : [];

  const variants = (product.variants) ? await Promise.all((await product.variants).map(async variant => {
    return await mapVariantToDto(variant);
  })) : [];

  const category = (product.category) ? {
    id: product.category.id,
    name: product.category.name,
    attributes: categoryAttributes
  } : null;

  const subCategory = (product.subCategory) ? {
    id: product.subCategory.id,
    name: product.subCategory.name,
    attributes: subCategoryAttributes
  } : null;

  return <ProductResponseDto>{
    id: product.id,
    sku: product.sku,
    title: product.title,
    description: product.description,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    new: product.new,
    discount: product.discount,
    offerEnd: offerEndDate,
    tags: tags,
    category: category,
    subCategory: subCategory,
    images: images,
    variants: variants
  };
}

export async function createProduct(createProductDto: CreateProductDto) {
  try {
    const offerEndDate = createProductDto.offerEnd ? moment(createProductDto.offerEnd).toDate() : undefined;
    const product = await context.db.productRepository.save({
      ...createProductDto,
      offerEnd: offerEndDate
    });
    return await mapProductToDto(product);
  } catch (e) {
    context.logger.warn(e);
    throw new Error("product could not be created!");
  }
}

export async function updateProduct(updateProductDto: UpdateProductDto) {
  try {
    const offerEndDate = updateProductDto.offerEnd ? moment(updateProductDto.offerEnd).toDate() : undefined;
    const { id, ...updateObj } = updateProductDto;
    const product = await context.db.productRepository.findOne(id);
    if (!product) {
      throw new Error("product not found!");
    }
    Object.keys(updateObj).forEach(k => {
      (product as any)[k] = (updateObj as any)[k];
    });
    if (offerEndDate)
      product.offerEnd = offerEndDate;
    const updatedProduct = await context.db.productRepository.save(product);
    return await mapProductToDto(updatedProduct);
  } catch (e) {
    context.logger.warn(e);
    throw new Error("product could not be updated!");
  }
}

export async function deleteProduct(deleteProductDto: DeleteProductDto) {
  try {
    const deleteResult = await context.db.productRepository.delete(deleteProductDto.id);
    if (deleteResult.affected == 1) {
      return;
    }
    throw new Error("product not found!");
  } catch (e) {
    context.logger.warn(e);
    throw new Error("product could not be deleted!");
  }
}










export async function queryProducts(queryProductsDto: QueryProductsDto): Promise<ProductListResponseDto> {
  try {
    const offset = (queryProductsDto.offset) ? queryProductsDto.offset : 0;
    const limit = (queryProductsDto.limit) ? queryProductsDto.limit : 30;
    const orderBy = (queryProductsDto.orderBy) ? queryProductsDto.orderBy : null;
    const orderDir = (queryProductsDto.orderDir) ? queryProductsDto.orderDir : undefined;

    let queryBuilder = context.db.productRepository.createQueryBuilder("products")
      .take(limit)
      .skip(offset)
      .leftJoinAndSelect("products.tags", "tags")
      .leftJoinAndSelect("products.images", "images")
      .leftJoinAndSelect("products.category", "category")
      .leftJoinAndSelect("category.attributes", "ca")
      .leftJoinAndSelect("ca.attribute", "caa")
      .leftJoinAndSelect("products.subCategory", "subCategory")
      .leftJoinAndSelect("subCategory.attributes", "sca")
      .leftJoinAndSelect("sca.attribute", "scaa")
      .leftJoinAndSelect("products.variants", "variants")
      .leftJoinAndSelect("variants.attributes", "va")

    if (queryProductsDto.categoryId) {
      queryBuilder = queryBuilder.andWhere("products.categoryId = :catId", { catId: queryProductsDto.categoryId });
    }
    
    if (queryProductsDto.search) {
      let formatedKeys = formatSearchQuery(queryProductsDto.search)
      queryBuilder = queryBuilder.andWhere('MATCH(title) AGAINST(:keys IN BOOLEAN MODE)', { keys: formatedKeys });
    }

    if (queryProductsDto.subCategoryId) {
      queryBuilder = queryBuilder.andWhere("products.subCategoryId = :subCatId", { subCatId: queryProductsDto.subCategoryId });
    }



    if (queryProductsDto.attributes && queryProductsDto.attributes.length > 0) {
      queryBuilder = queryBuilder
      .leftJoinAndSelect("variants.attributes","va");

      queryProductsDto.attributes.forEach(attribute=>{
        queryBuilder = queryBuilder
          .andWhere("va.attributeId = :aId", { aId: attribute.attributeId })
          .andWhere("va.value = :value", { value: attribute.value });
      });

    }

    if (orderBy){
      queryBuilder = queryBuilder.addOrderBy("products."+orderBy,orderDir)
    }

    const countQueryBuilder = queryBuilder.clone();


    const [products, count] = await Promise.all(
      [
        queryBuilder.getMany(),
        countQueryBuilder.getCount()
      ]
    );


    const productsResponse = await Promise.all(products.map(async product => {
      return await mapProductToDto(product);
    }));
    return <ProductListResponseDto>{
      results: productsResponse,
      totalCount: count
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not query products!");
  }
}

function formatSearchQuery(query: string) {
  let newQuery = query
    .trim()
    .split(' ')
    .reverse()
    .map(m => (m.length < 3 ? m : m + '*'))
    .filter(f => f !== '')
    .join(' ');
  return newQuery;
}

















export async function getProductById(productId: number) {
  try {
    const product = await context.db.productRepository.findOne(productId, {
      relations: [
        "tags",
        "images",
        "category", "category.attributes", "category.attributes.attribute",
        "subCategory", "subCategory.attributes", "subCategory.attributes.attribute",
        "variants", "variants.attributes"
      ]
    });
    if (!product) {
      throw new Error("product not found!");
    }
    return mapProductToDto(product);
  } catch (e) {
    context.logger.warn(e);
    throw new Error("product not found!");
  }
}

export async function getProductBySKU(skuValue: string) {
  try {
    // const product = await context.db.productRepository.findOne({ sku:"sku0001"}, {
    //   relations: [
    //     "tags",
    //     "images",
    //     "category", "category.attributes", "category.attributes.attribute",
    //     "subCategory", "subCategory.attributes", "subCategory.attributes.attribute",
    //     "variants", "variants.attributes"
    //   ]
    // });

    // const product = await context.db.productRepository.findOne({ sku:skuValue})
    const product = await context.db.productRepository.createQueryBuilder("products")
        .where("products.sku = :Sku",{Sku:skuValue })
        .getOne()
    console.log(product)
    if (!product) {
      throw new Error("product not found!");
    }
    return mapProductToDto(product);
  } catch (e) {
    context.logger.warn(e);
    throw new Error("product not found!");
  }
}

export async function linkProductTag(linkProductTagDto: LinkProductTagDto) {
  const [product, tag] = await Promise.all([
    context.db.productRepository.findOne(linkProductTagDto.productId, { relations: ["tags"] }),
    context.db.tagRepository.findOne(linkProductTagDto.tagId)
  ]);
  if (!product) {
    throw new Error("product not found!");
  }
  if (!tag) {
    throw new Error("tag not found!");
  }
  const tags = await product.tags;
  // if tag already exists return
  if (tags.some(t => t.id == tag.id)) {
    return;
  }
  await context.db.productRepository.createQueryBuilder()
    .relation(Product, "tags")
    .of(product)
    .add(tag);
}

export async function removeLinkProductTag(removeLinkProductTagDto: RemoveLinkProductTagDto) {
  const [product, tag] = await Promise.all([
    context.db.productRepository.findOne(removeLinkProductTagDto.productId, { relations: ["tags"] }),
    context.db.tagRepository.findOne(removeLinkProductTagDto.tagId)
  ]);
  if (!product) {
    throw new Error("product not found!");
  }
  if (!tag) {
    throw new Error("tag not found!");
  }
  await context.db.productRepository.createQueryBuilder()
    .relation(Product, "tags")
    .of(product)
    .remove(tag);
}
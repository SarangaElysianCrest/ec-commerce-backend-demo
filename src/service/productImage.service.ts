import context from "../lib/context";
import { ProductImageResponseDto, CreateProductImageDto, DeleteProductImageDto, QueryProductImagesDto, UpdateProductImageDto } from "../dto/productImage.dto";

export async function createProductImage(createProductImageDto: CreateProductImageDto) {
  try {
    const productImage = await context.db.productImageRepository.save({
      ...createProductImageDto
    });
    return <ProductImageResponseDto>{
      ...productImage
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("productImage could not be created!");
  }
}

export async function updateProductImage(updateProductImageDto: UpdateProductImageDto) {
  try {
    const { id, ...updateObj } = updateProductImageDto;
    const productImage = await context.db.productImageRepository.findOne(id);
    if (!productImage) {
      throw new Error("productImage not found!");
    }
    Object.keys(updateObj).forEach(k => {
      (productImage as any)[k] = (updateObj as any)[k];
    });
    const updatedProductImage = await context.db.productImageRepository.save(productImage);
    return <ProductImageResponseDto>{
      ...updatedProductImage
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("productImage could not be updated!");
  }
}

export async function deleteProductImage(deleteProductImageDto: DeleteProductImageDto) {
  try {
    const deleteResult = await context.db.productImageRepository.delete(deleteProductImageDto.id);
    if (deleteResult.affected == 1) {
      return;
    }
    throw new Error("productImage not found!");
  } catch (e) {
    context.logger.warn(e);
    throw new Error("productImage could not be deleted!");
  }
}

export async function queryProductImages(queryProductImagesDto: QueryProductImagesDto) {
  try {
    const productImages = await context.db.productImageRepository.find();
    return productImages.map(u => {
      return <ProductImageResponseDto>{
        ...u
      };
    });
  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not query productImages!");
  }
}

export async function getProductImageById(productImageId: number) {
  try {
    const productImage = await context.db.productImageRepository.findOne(productImageId);
    if (!productImage) {
      throw new Error("productImage not found!");
    }
    return <ProductImageResponseDto>{
      ...productImage
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("productImage not found!");
  }
}
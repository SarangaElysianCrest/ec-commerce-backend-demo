// import context from "../lib/context";
// import { ProductVariantAttributeResponseDto, CreateProductVariantAttributeDto, DeleteProductVariantAttributeDto, QueryProductVariantAttributesDto, UpdateProductVariantAttributeDto } from "../dto/variantAttribute.dto";

// export async function createProductVariantAttribute(createProductVariantAttributeDto: CreateProductVariantAttributeDto) {
//   try {
//     const productVariantAttribute = await context.db.productVariantAttributeRepository.save({
//       ...createProductVariantAttributeDto
//     });
//     return <ProductVariantAttributeResponseDto>{
//       ...productVariantAttribute
//     };
//   } catch (e) {
//     context.logger.warn(e);
//     throw new Error("productVariantAttribute could not be created!");
//   }
// }

// export async function updateProductVariantAttribute(updateProductVariantAttributeDto: UpdateProductVariantAttributeDto) {
//   try {
//     const { id, ...updateObj } = updateProductVariantAttributeDto;
//     const productVariantAttribute = await context.db.productVariantAttributeRepository.findOne(id);
//     if (!productVariantAttribute) {
//       throw new Error("productVariantAttribute not found!");
//     }
//     Object.keys(updateObj).forEach(k => {
//       (productVariantAttribute as any)[k] = (updateObj as any)[k];
//     });
//     const updatedProductVariantAttribute = await context.db.productVariantAttributeRepository.save(productVariantAttribute);
//     return <ProductVariantAttributeResponseDto>{
//       ...updatedProductVariantAttribute
//     };
//   } catch (e) {
//     context.logger.warn(e);
//     throw new Error("productVariantAttribute could not be updated!");
//   }
// }

// export async function deleteProductVariantAttribute(deleteProductVariantAttributeDto: DeleteProductVariantAttributeDto) {
//   try {
//     const deleteResult = await context.db.productVariantAttributeRepository.delete(deleteProductVariantAttributeDto.id);
//     if (deleteResult.affected == 1) {
//       return;
//     }
//     throw new Error("productVariantAttribute not found!");
//   } catch (e) {
//     context.logger.warn(e);
//     throw new Error("productVariantAttribute could not be deleted!");
//   }
// }

// export async function queryProductVariantAttributes(queryProductVariantAttributesDto: QueryProductVariantAttributesDto) {
//   try {
//     const productVariantAttributes = await context.db.productVariantAttributeRepository.find();
//     return productVariantAttributes.map(u => {
//       return <ProductVariantAttributeResponseDto>{
//         ...u
//       };
//     });
//   } catch (e) {
//     context.logger.warn(e);
//     throw new Error("could not query productVariantAttributes!");
//   }
// }

// export async function getProductVariantAttributeById(productVariantAttributeId: string) {
//   try {
//     const productVariantAttribute = await context.db.productVariantAttributeRepository.findOne(productVariantAttributeId);
//     if (!productVariantAttribute) {
//       throw new Error("productVariantAttribute not found!");
//     }
//     return <ProductVariantAttributeResponseDto>{
//       ...productVariantAttribute
//     };
//   } catch (e) {
//     context.logger.warn(e);
//     throw new Error("productVariantAttribute not found!");
//   }
// }
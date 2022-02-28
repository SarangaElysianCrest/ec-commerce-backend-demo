import { TagResponseDto } from "./tag.dto";
import { CategoryResponseDto } from "./category.dto";
import { SubCategoryResponseDto } from "./subCategory.dto";
import { VariantResponseDto } from "./variant.dto";
import { ProductImage } from "../db/entity/productImage";
import { ProductImageResponseDto } from "./productImage.dto";

export enum Order{
  ASC = "ASC",
  DESC = "DESC",
}

export interface CreateProductDto {
  sku: string;
  title: string;
  description: string;
  stock: number;
  price: number;
  discount: number;
  offerEnd: string;
  new: boolean;
  rating: number;
  categoryId: number;
  subCategoryId: number;
}

export interface UpdateProductDto {
  id: number;
  sku: string;
  title: string;
  description: string;
  stock: number;
  price: number;
  discount: number;
  offerEnd: string;
  new: boolean;
  rating: number;
}

export interface DeleteProductDto {
  id: number;
}

export interface QueryProductDtoBySku {
  sku: string;
}


export interface QueryProductsDto {
  id: number;
  subCategoryId: number;
  categoryId: number;
  attributes: { attributeId: number, value: string }[];
  limit: number;
  offset: number;
  orderBy: string;
  orderDir: Order;
  search:string;
}

export interface LinkProductTagDto {
  productId: number;
  tagId: number;
}

export interface RemoveLinkProductTagDto {
  productId: number;
  tagId: number;
}

export interface ProductResponseDto {
  id: number;
  sku: string;
  title: string;
  description: string;
  stock: number;
  price: number;
  discount: number;
  offerEnd: string;
  new: boolean;
  rating: number;
  category: CategoryResponseDto;
  subCategory: SubCategoryResponseDto;
  tags: TagResponseDto[];
  variants: VariantResponseDto[];
  images: ProductImageResponseDto[];
}

export interface ProductListResponseDto {
  results: ProductResponseDto[],
  totalCount: number
}

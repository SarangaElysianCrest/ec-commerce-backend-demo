import { OrderedAttributeResponseDto } from "./attribute.dto";

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  id: number;
  name: string;
}

export interface DeleteCategoryDto {
  id: number;
}

export interface QueryCategoriesDto {
  id: number;
}

export interface CategoryResponseDto {
  id: number;
  name: string;
  attributes: OrderedAttributeResponseDto[];
}

export interface LinkCategoryAttributeDto {
  categoryId: number;
  attributeId: number;
  order: number;
}

export interface DeleteCategoryAttributeDto {
  categoryId: number;
  attributeId: number;
}

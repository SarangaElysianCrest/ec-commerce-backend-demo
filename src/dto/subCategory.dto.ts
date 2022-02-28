import { CategoryResponseDto } from "./category.dto";
import { OrderedAttributeResponseDto } from "./attribute.dto";

export interface CreateSubCategoryDto {
  name: string;
  categoryId: number;
}

export interface UpdateSubCategoryDto {
  id: number;
  name: string;
  categoryId: number;
}

export interface DeleteSubCategoryDto {
  id: number;
}

export interface QuerySubCategoriesDto {
  id?: number;
  categoryId: number;
}

export interface SubCategoryResponseDto {
  id: number;
  name: string;
  category: CategoryResponseDto | number;
  attributes: OrderedAttributeResponseDto[];
}

export interface LinkSubCategoryAttributeDto {
  subCategoryId: number;
  attributeId: number;
  order: number;
}

export interface DeleteSubCategoryAttributeDto {
  subCategoryId: number;
  attributeId: number;
}

export interface QuerySubCategoriesByCategories{
    result:[]
}

export interface ResponseSubCategoriesDTO{
  categoryId: number;

}
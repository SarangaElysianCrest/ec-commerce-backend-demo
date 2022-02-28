import { AttributeType } from "../db/entity/attribute";

export interface CreateAttributeDto {
  name: string;
  label: string;
  type: AttributeType;
}

export interface UpdateAttributeDto {
  id: number;
  name: string;
  label: string;
  type: AttributeType;
}

export interface DeleteAttributeDto {
  id: number;
}

export interface QueryAttributesDto {
  id: number;
}

export interface AttributeResponseDto {
  id: number;
  name: string;
  type: AttributeType;
}

export interface OrderedAttributeResponseDto {
  id: number;
  name: string;
  type: AttributeType;
  order: number;
}

export interface CreateVariantDto {
  productId: number;
  stock: number;
  price: number;
  discount: number;
  offerEnd: string;
  image: string;
}

export interface UpdateVariantDto {
  id: number;
  productId: number;
  stock: number;
  price: number;
  discount: number;
  offerEnd: string;
  image: string;
}

export interface DeleteVariantDto {
  id: number;
}

export interface QueryVariantsDto {
  id: number;
}

export interface AddVariantAttributeDto {
  attributeId: number;
  variantId: number;
  value: string;
}

export interface RemoveVariantAttributeDto {
  attributeId: number;
  variantId: number;
};

export interface VariantAttributeResponseDto {
  attributeId: number;
  value: string;
};

export interface VariantResponseDto {
  id: number;
  productId: number;
  stock: number;
  price: number;
  discount: number;
  offerEnd: string;
  image: string;
  attributes: VariantAttributeResponseDto[];
}

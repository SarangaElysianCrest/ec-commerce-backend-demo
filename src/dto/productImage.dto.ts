export interface CreateProductImageDto {
  productId: number;
  url: string;
}

export interface UpdateProductImageDto {
  id: number;
  productId: string;
  url: string;
}

export interface DeleteProductImageDto {
  id: number;
}

export interface QueryProductImagesDto {
  id: number;
}

export interface ProductImageResponseDto {
  id: number;
  productId: number;
  url: string;
}

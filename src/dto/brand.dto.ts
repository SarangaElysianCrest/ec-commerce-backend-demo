export interface CreateBrandDto {
  name: string;
}

export interface UpdateBrandDto {
  id: number;
  name: string;
}

export interface DeleteBrandDto {
  id: number;
}

export interface QueryBrandsDto {
  id: number;
}

export interface BrandResponseDto {
  id: number;
  name: string;
}

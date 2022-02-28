import context from "../lib/context";
import { BrandResponseDto, CreateBrandDto, DeleteBrandDto, QueryBrandsDto, UpdateBrandDto } from "../dto/brand.dto";

export async function createBrand(createBrandDto: CreateBrandDto) {
  try {
    const brand = await context.db.brandRepository.save({
      ...createBrandDto
    });
    return <BrandResponseDto>{
      ...brand
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("brand could not be created!");
  }
}

export async function updateBrand(updateBrandDto: UpdateBrandDto) {
  try {
    const { id, ...updateObj } = updateBrandDto;
    const brand = await context.db.brandRepository.findOne(id);
    if (!brand) {
      throw new Error("brand not found!");
    }
    Object.keys(updateObj).forEach(k => {
      (brand as any)[k] = (updateObj as any)[k];
    });
    const updatedBrand = await context.db.brandRepository.save(brand);
    return <BrandResponseDto>{
      ...updatedBrand
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("brand could not be updated!");
  }
}

export async function deleteBrand(deleteBrandDto: DeleteBrandDto) {
  try {
    const deleteResult = await context.db.brandRepository.delete(deleteBrandDto.id);
    if (deleteResult.affected == 1) {
      return;
    }
    throw new Error("brand not found!");
  } catch (e) {
    context.logger.warn(e);
    throw new Error("brand could not be deleted!");
  }
}

export async function queryBrands(queryBrandsDto: QueryBrandsDto) {
  try {
    const brands = await context.db.brandRepository.find();
    return brands.map(u => {
      return <BrandResponseDto>{
        ...u
      };
    });
  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not query brands!");
  }
}

export async function getBrandById(brandId: number) {
  try {
    const brand = await context.db.brandRepository.findOne(brandId);
    if (!brand) {
      throw new Error("brand not found!");
    }
    return <BrandResponseDto>{
      ...brand
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("brand not found!");
  }
}
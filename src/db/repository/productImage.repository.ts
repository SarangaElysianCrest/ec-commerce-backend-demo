import { EntityRepository, Repository } from "typeorm";
import { ProductImage } from "../entity/productImage";

@EntityRepository(ProductImage)
export default class ProductImageRepository extends Repository<ProductImage> {

}
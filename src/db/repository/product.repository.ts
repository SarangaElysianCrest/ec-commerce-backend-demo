import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entity/product";

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {

}
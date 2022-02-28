import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entity/product";

@EntityRepository(Product)
export default class SearchRepository extends Repository<Product> {
    
}
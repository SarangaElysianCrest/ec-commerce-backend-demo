import { EntityRepository, Repository } from "typeorm";
import { Category } from "../entity/category";
import { SubCategory } from "../entity/subCategory";

@EntityRepository(SubCategory)
export default class SubCategoryRepository extends Repository<SubCategory> {

}
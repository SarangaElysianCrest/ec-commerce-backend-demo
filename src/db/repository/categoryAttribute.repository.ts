import { EntityRepository, Repository } from "typeorm";
import { CategoryAttribute } from "../entity/categoryAttribute";

@EntityRepository(CategoryAttribute)
export default class CategoryAttributeRepository extends Repository<CategoryAttribute> {

}
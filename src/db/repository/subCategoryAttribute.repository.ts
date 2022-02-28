import { EntityRepository, Repository } from "typeorm";
import { SubCategoryAttribute } from "../entity/subCategoryAttribute";

@EntityRepository(SubCategoryAttribute)
export default class SubCategoryAttributeRepository extends Repository<SubCategoryAttribute> {

}
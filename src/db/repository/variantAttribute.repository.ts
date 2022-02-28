import { EntityRepository, Repository } from "typeorm";
import { VariantAttribute } from "../entity/variantAttribute";

@EntityRepository(VariantAttribute)
export default class VariantAttributeRepository extends Repository<VariantAttribute> {

}
import { EntityRepository, Repository } from "typeorm";
import { Variant } from "../entity/variant";

@EntityRepository(Variant)
export default class VariantRepository extends Repository<Variant> {

}
import { EntityRepository, Repository } from "typeorm";
import { Attribute } from "../entity/attribute";

@EntityRepository(Attribute)
export default class AttributeRepository extends Repository<Attribute> {

}
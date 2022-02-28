import { EntityRepository, Repository } from "typeorm";
import { Brand } from "../entity/brand";

@EntityRepository(Brand)
export default class BrandRepository extends Repository<Brand> {

}
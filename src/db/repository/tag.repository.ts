import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entity/tag";

@EntityRepository(Tag)
export default class TagRepository extends Repository<Tag> {

}
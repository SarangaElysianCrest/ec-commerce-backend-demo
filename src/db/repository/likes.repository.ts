import { EntityRepository, Repository } from "typeorm";
import {Likes} from "../entity/likes";

@EntityRepository(Likes)
export default class LikesRepository extends Repository<Likes> {

}
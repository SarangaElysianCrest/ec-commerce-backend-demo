import { EntityRepository, Repository } from "typeorm";
import {Review} from "../entity/review";


@EntityRepository(Review)
export default class ReviewRepository extends Repository<Review> {

}
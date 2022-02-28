import { EntityRepository, Repository } from "typeorm";
import {PromoCode} from "../entity/promoCode";

@EntityRepository(PromoCode)
export default class PromoCodeRepository extends Repository<PromoCode>{

}
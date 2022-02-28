import { EntityRepository, Repository } from "typeorm";
import {OrderItem} from "../entity/orderItem";

@EntityRepository(OrderItem)
export default class OrderItemRepository extends Repository<OrderItem> {

}
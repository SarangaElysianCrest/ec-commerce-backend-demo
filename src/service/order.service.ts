import {Order} from "../db/entity/order";
import {
    OrderCreateDto, OrderResponseDto, OrderDeleteDto, OrderQueryDto, OrderUpdateDto, ListOrderResponseDto, OrderDetailedResponseDto
} from "../dto/order.dto";
import {
    OrderItemsCreateDto, OrderItemsResponseDto,
} from "../dto/orderItems.dto"
import context from "../lib/context";
import { generate } from 'shortid';
import {DeleteReviewDto, ReviewListResponseDto, ReviewResponseDto, UpdateReviewDto} from "../dto/review.dto";
import {OrderItem} from "../db/entity/orderItem";
import seedData from "../seedData";
import {BrandResponseDto, QueryBrandsDto} from "../dto/brand.dto";
import {ProductImageResponseDto, QueryProductImagesDto} from "../dto/productImage.dto";


function mapOrderToDto(order: Order ): OrderResponseDto {
    return {
     id: order.id,
     userId:order.userId,
     firstname:order.firstname,
     lastname: order.lastname,
     companyName: order.companyName,
     addressLine1:order.addressLine1,
     addressLine2: order.addressLine2,
     city: order.city,
     province: order.province,
     postcode: order.postcode,
     country: order.country,
     phone: order.phone,
     email: order.email,
     notes: order.notes,
     total: order.total,
     currency: order.currency,
     rate: order.rate,
     type: order.type,
     status: order.status,
    } as OrderResponseDto
}

function mapOrderItemsToDto(orderItems: OrderItem[] ): OrderItemsResponseDto[] {
    return orderItems.map(item=>{
        return {
            id:item.id,
            productId:item.productId,
            name:item.name,
            variant:item.variant,
            sku:item.sku,
            quantity:item.quantity,
            price:item.price,
        } as OrderItemsResponseDto;
    })
}

export async function createOrder(orderCreateDto:OrderCreateDto) {
    try {
        
        let id = `NOVA-${generate()}`;
    
        // let total:number = orderCreateDto.items.reduce((p:number,v)=>{
        //     return p + v.price * v.quantity;
        // },0)

        let itemsWithOrderId: OrderItemsCreateDto[] = orderCreateDto.items.map((item: OrderItemsCreateDto) => {
            item.order = id;
            return item;
        });
    
        const order = await context.db.orderRepository.save({
           ...orderCreateDto,
           id:id,
        //    total:total,
           status:0
        });

        const items = await context.db.orderItemRepository.save(itemsWithOrderId);

        return  {order: mapOrderToDto(order), items:mapOrderItemsToDto(items)} as OrderDetailedResponseDto;


    } catch (e) {
        context.logger.warn(e);
        throw new Error("Order Could not be created!");
    }

}

export async function updateOrder(orderUpdateDto: OrderUpdateDto) {
    try {
        const { id, ...updateObj } = orderUpdateDto;
        const order = await context.db.orderRepository.findOne(id);
        if (!order) {
            throw new Error("Order not found!");
        }
        Object.keys(updateObj).forEach(k => {
            (order as any)[k] = (updateObj as any)[k];
        });
        const updatedOrder = await context.db.orderRepository.save(order);
        return {
            id: updatedOrder.id,
            userId:updatedOrder.userId,
            firstname:updatedOrder.firstname,
            lastname: updatedOrder.lastname,
            companyName: updatedOrder.companyName,
            addressLine1:updatedOrder.addressLine1,
            addressLine2: updatedOrder.addressLine2,
            city: updatedOrder.city,
            province: updatedOrder.province,
            postcode: updatedOrder.postcode,
            country: order.country,
            phone: updatedOrder.phone,
            email: updatedOrder.email,
            notes: updatedOrder.notes,
            total: updatedOrder.total,
            currency: updatedOrder.currency,
            rate: updatedOrder.rate,
            type: updatedOrder.type,
            status: updatedOrder.status,
        } as OrderResponseDto;
    } catch (e) {
        context.logger.warn(e);
        throw new Error("order could not be updated!");
    }
}

export async function deleteOrder(orderDeleteDto: OrderDeleteDto) {
    try {
        const deleteResult = await context.db.orderRepository.delete(orderDeleteDto.id);
        if (deleteResult.affected == 1) {
            return;
        }
        throw new Error("Order not found!");
    } catch (e) {
        context.logger.warn(e);
        throw new Error("Order could not be deleted!");
    }
}

export async function queryOrders(queryDto: OrderQueryDto) {
    try {
        const limit = (queryDto.limit) ? queryDto.limit : 30;
        const offset = (queryDto.offset) ? queryDto.offset : 0;
        const userId = (queryDto.userId) ? queryDto.userId : null;
        const id = (queryDto.id) ? queryDto.id : null;

        let queryBuilder = context.db.orderRepository.createQueryBuilder('orders')
        .leftJoinAndSelect("orders.items","items")

        if(limit){
            queryBuilder = queryBuilder.take(limit);
        }

        if(offset){
            queryBuilder = queryBuilder.skip(offset);
        }

        if(userId){
            queryBuilder = queryBuilder.where('orders.userId = :userId',{userId})
        }
        if(id){
            queryBuilder = queryBuilder.where('orders.id = :id',{id})
        }

        if(id){
            queryBuilder = queryBuilder.where('orders.id = :id',{id})
        }

        const countQueryBuilder = queryBuilder.clone();

        const [results,count] = await countQueryBuilder.getManyAndCount()
        return {results,count};

    } catch (error) {
        console.warn(error);
        throw new Error("Could not Retrieve Orders");
    }
}


export async function queryOrderById(orderId: string) {
    try {
        const orders = await context.db.orderRepository.findOne(orderId);
        if (!orders) {
            throw new Error("orders not found!");
        }
        return <OrderResponseDto>{
            ...orders
        };
    } catch (e) {
        context.logger.warn(e);
        throw new Error("could not query orders!");
    }
}



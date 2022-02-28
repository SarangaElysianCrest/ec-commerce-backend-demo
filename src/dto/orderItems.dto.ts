import {OrderResponseDto} from "./order.dto";

export interface OrderItemsCreateDto{
    id:string,
    name:string,
    order: string,
    productId:string,
    sku: string;
    variant: string;
    quantity:  number;
    price: number;
}

export interface OrderItemsUpdateDto {
    id:string;
    sku: string;
    variant: string;
    quantity:  number;
    price: number;
}

export interface OrderItemsDeleteDto{
    id:string
}

export interface OrderItemsQueryDto{
    id:string;
    sku: string;
    variant: string;
    quantity:  number;
    order: string
}

export interface OrderItemsResponseDto{
    id:string;
    order: string,
    productId:string,
    name:string,
    sku: string;
    variant: string;
    quantity: number;
    price: number;
}


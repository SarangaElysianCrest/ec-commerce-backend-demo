import {OrderItemsResponseDto, OrderItemsCreateDto} from "./orderItems.dto";
import {test} from "./review.dto";

export interface OrderCreateDto{
    userId: string;
    firstname: string;
    lastname: string;
    companyName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postcode: string;
    country: string;
    phone: string;
    email: string;
    notes: string;
    total: number;
    currency: string;
    rate: number;
    type: string;
    status: number;
    items: OrderItemsCreateDto[]
    createdAt: Date;
}

export interface OrderUpdateDto {
    id: string;
    userId: string;
    firstname: string;
    lastname: string;
    companyName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postcode: string;
    country: string;
    phone: string;
    email: string;
    notes: string;
    total: number;
    currency: string;
    rate:number;
    type: string;
    status: number;
}

export interface OrderDeleteDto{
    id:string
}

export interface OrderQueryDto{
    id:string;
    userId: string;
    firstname: string;
    lastname: string;
    companyName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postcode: string;
    country: string;
    phone: string;
    email: string;
    notes: string;
    total: number;
    currency: string;
    rate: number;
    type: string;
    status: number;
    createdAt: Date;
    limit:number,
    offset:number
}

export interface OrderResponseDto{
    userId: string;
    firstname: string;
    lastname: string;
    companyName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postcode: string;
    country: string;
    phone: string;
    email: string;
    notes: string;
    total: number;
    currency: string;
    rate: number;
    type: string;
    status: number;
}

export interface OrderDetailedResponseDto{
    order: OrderResponseDto,
    items: OrderItemsResponseDto[]
}

export interface ListOrderResponseDto {
    results: OrderQueryDto[],
    totalCount: number
}

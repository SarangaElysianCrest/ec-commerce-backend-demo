import { ProductResponseDto } from "./product.dto";
import { UserResponseDto } from "./user.dto";
import {LikesResponseDto, LikesResponseDtoJoins} from "./likes.dto"


export interface CreateReviewDto{
    message: string,
    rating: number,
    status: number,
    like: number,
    dislike: number,
    userId: string,
    productId:number,
    liked:boolean,
    disliked:boolean,
}

export interface UpdateReviewDto{
    id: number,
    message: string,
    rating: number,
    status: number,
    like: number,
    dislike: number,
    userId: string,
    productId: number,
    liked:boolean,
    disliked:boolean,
}

export interface DeleteReviewDto{
    id: number,
}

export interface QueryReviewDto{
    id: number,
    userId: string,
    productId:number,
    likes: LikesResponseDtoJoins | [],
    liked:boolean,
    disliked:boolean,
}

export interface QueryReviewJoinDto{
    id: number;
    sku:string;
    userId: string,
    productId:number,
    reviewId:number,
    likes: LikesResponseDtoJoins | [],
    liked:boolean,
    disliked:boolean,
}

export interface  ReviewResponseDto{
    id: number,
    message: string,
    rating: number,
    status: number,
    like: number,
    dislike: number,
    user: UserResponseDto | any,
    product: ProductResponseDto | number,
    liked:boolean,
    disliked:boolean,
    // likes:string[]
}

export interface ReviewResponseDtoQueryBuilder{
    id: number,
    message: string,
    rating: number,
    status: number,
    like: number,
    dislike: number,
    user: UserResponseDto ,
    product: ProductResponseDto,
    likes: LikesResponseDtoJoins | [],
    liked:boolean,
    disliked:boolean,
}

export interface test{
    id: number,
    message: string,
    rating: number,
    status: number,
    like: number,
    dislike: number,
    user: UserResponseDto ,
    product: ProductResponseDto,
    likes: LikesResponseDtoJoins | [],
    liked:boolean,
    disliked:boolean,
}

export interface ReviewListResponseDto {
    results: test[],
    totalCount: number
}
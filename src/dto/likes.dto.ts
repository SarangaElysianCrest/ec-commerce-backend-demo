import {ReviewResponseDto} from "./review.dto";
import {UserResponseDto} from "./user.dto";

export interface CreateLikeDto {
    deleted:boolean;
    reaction:boolean,
    reviewId: number;
    userId:string
  }
  
  export interface UpdateLikeDto {
    id: number;
    reviewId: number;
    userId:string;
    deleted:boolean;
    reaction:boolean,
  }
  
  export interface DeleteLiketDto {
    // id: number;
    reviewId: number;
    userId:string
    reaction:boolean,
  }
  
  export interface QueryLikeDto {
    id: number;
  }

  export interface LikesResponseDto {
    id: number;
    deleted: boolean;
    reaction:boolean,
    reviewId: ReviewResponseDto | number;
    userId:  UserResponseDto| string
  }

export interface LikesResponseDtoJoins {
  id: number;
  deleted: boolean;
  reaction:boolean,
  reviewId: ReviewResponseDto | number;
  userId: UserResponseDto | string
}
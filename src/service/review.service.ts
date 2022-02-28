import { Review } from "../db/entity/review";
import {
  CreateReviewDto,
  UpdateReviewDto,
  DeleteReviewDto,
  QueryReviewDto,
  ReviewResponseDto,
  QueryReviewJoinDto,
  ReviewListResponseDto,
  test, ReviewResponseDtoQueryBuilder
} from "../dto/review.dto";
import context from "../lib/context";
import moment from "moment";
import { LikesResponseDto } from "../dto/likes.dto";
import {ProductListResponseDto, QueryProductsDto} from "../dto/product.dto";

async function mapReviewToDto(review: Review ): Promise<ReviewResponseDto> {
  return {
      id:review.id,
      message: review.message,
      rating: review.rating,
      status: review.status,
      like: review.like,
      dislike: review.dislike,
      user:review.userId,
      product:review.productId,
      likes: review.likes,
      liked:review.liked,
      disliked:review.disliked,
  } as ReviewResponseDto;
}



async function mapReviewToDtoForLiked(review: Review, userId:string): Promise<ReviewResponseDto> {

   const userID = userId
  // hanlde the liked in ReviewResponseDto
  function f() {
     let status =  false;
     review.likes.forEach((element)=>{
       if (element.userId === userID && element.reaction){
         status = true
       }else if (status === true) {
         status =  true
       }else{
         status = false
       }
     })
      return status;
  }

  function disliked(){
    let status =  false;
    review.likes.forEach((element)=>{
      // console.log(element.reaction)
      if (element.userId === userID && !element.reaction){
        status = true
      }else if (status === true) {
        status =  true
      }else{
        status = false
      }
    })
    return status;
  }

  let likesCount: number = 0;
  let dislikesCount: number = 0;
  review.likes.forEach((element)=>{
    if (element.reaction === true){
      likesCount += 1;
    }else{
      dislikesCount += 1;
    }
  })

  return {
    id:review.id,
    message: review.message,
    rating: review.rating,
    status: review.status,
    like: likesCount,
    dislike: dislikesCount,
    user:review.user,
    product:review.productId,
    likes: review.likes,
    disliked:disliked(),
    liked: f(),
  } as ReviewResponseDto;

}


export async function createReview(createReviewDto:CreateReviewDto) {
  try {
    const review = await context.db.reviewRepository.save({
      ...createReviewDto
    });
    return await mapReviewToDto(review);
  } catch (e) {
    context.logger.warn(e);
    throw new Error("review could not be created!");
  }
}

export async function updateReview(updateReviewDto: UpdateReviewDto) {
    try {
      const { id, ...updateObj } = updateReviewDto;
      const review = await context.db.reviewRepository.findOne(id);
      if (!review) {
        throw new Error("Review not found!");
      }
      Object.keys(updateObj).forEach(k => {
        (review as any)[k] = (updateObj as any)[k];
      });
      const updatedReview = await context.db.reviewRepository.save(review);
      return {
        id: updatedReview.id,
        message: updatedReview.message,
        rating: updatedReview.rating,
        status: updatedReview.status,
        like: updatedReview.like,
        dislike: updatedReview.dislike,
        user: updatedReview.userId,
        product: updatedReview.productId,
        liked:updatedReview.liked,
        disliked:review.disliked,
      } as ReviewResponseDto;
    } catch (e) {
      context.logger.warn(e);
      throw new Error("review could not be updated!");
    }
  }

  // export async function deleteReview(deleteReviewDto: DeleteReviewDto) {
  //   try {
  //     const deleteResult = await context.db.reviewRepository.delete(deleteReviewDto.id);
  //     if (deleteResult.affected == 1) {
  //       return;
  //     }
  //     throw new Error("review not found!");
  //   } catch (e) {
  //     context.logger.warn(e);
  //     throw new Error("review could not be deleted!");
  //   }
  // }


  export async function queryReview(queryReviewDto: QueryReviewDto) {
    try {
      const reviews = await context.db.reviewRepository.find({ relations: ["product", "user"] });
      return await Promise.all(reviews.map(async review => {
        return {
          id: review.id,
          message: review.message,
          rating: review.rating,
          status: review.status,
          like: review.like,
          dislike: review.dislike,
          liked:review.liked,
          disliked:review.disliked,
          user : {
            id: review.user.id,
            firstName: review.user.firstName
          },
          product:{
            id: review.product.id,
            title: review.product.title,
          }
        } as ReviewResponseDto;
      }));
    } catch (e) {
      context.logger.warn(e);
      throw new Error("could not query reviews!");
    }
  }

  export async function getReviewById(reviewId: number) {
    try {
      const review = await context.db.reviewRepository.findOne( reviewId, {relations: ["product", "user"] });
      if (!review) {
        throw new Error("review not found!");
      }
      return {
        id: review.id,
        message: review.message,
        rating: review.rating,
        status: review.status,
        like: review.like,
        dislike: review.dislike,
        liked:review.liked,
        disliked:review.disliked,
      } as ReviewResponseDto;
    } catch (e) {
      context.logger.warn(e);
      throw new Error("review not found!");
    }
  }


  // export async function getReviewByProductId(productId: number) {
  //   console.log(productId)
  //   try {
  //     const review = await context.db.reviewRepository.find({where:{productId : "1"} , relations: ["product", "user"] });
  //     if (!review) {
  //       throw new Error("review not found!");
  //     }
  //     return <ReviewResponseDto>{
  //       id: review.id,
  //       message: review.message,
  //       rating: review.rating,
  //       status: review.status,
  //       like: review.like,
  //       dislike: review.dislike,
  //       product:{
  //         id: review.product.id,
  //         title: review.product.title,
  //       }
  //     };
  //   } catch (e) {
  //     context.logger.warn(e);
  //     throw new Error("review not found!");
  //   }
  // }




  export async function queryReviewByProductId(productId: string) {
    try {
      const reviews = await context.db.reviewRepository.find({where:{productId}, relations: ["product", "user"] });
      return await Promise.all(reviews.map(async review => {

        return {
          id: review.id,
          message: review.message,
          rating: review.rating,
          status: review.status,
          like: review.like,
          dislike: review.dislike,
          liked:review.liked,
          disliked:review.disliked,
          user : {
            id: review.user.id,
            firstName: review.user.firstName
          },
          product:{
            id: review.product.id,
            title: review.product.title,
          },

        } as ReviewResponseDto;
      }));
    } catch (e) {
      context.logger.warn(e);
      throw new Error("could not query reviews!");
    }
  }




export async function queryReviewJoin(productId: number, userId:string) {
  try {
    const reviews = await context.db.reviewRepository.createQueryBuilder("review")
        .leftJoinAndSelect("review.likes", "likes",)
        .leftJoinAndSelect("review.user", "users",)
        .where("review.productId = :productId",{productId})
        // .andWhere("likes.userId = :userId", { userId: userId })


        const countQueryBuilder = reviews.clone();
        const [review, count] = await Promise.all(
          [
            reviews.getMany(),
            countQueryBuilder.getCount()
          ]
          );
    const reviewResponse = await Promise.all(review.map(async product => {
      return await mapReviewToDtoForLiked(product,userId);
    }));

    return {
      results: reviewResponse,
      totalCount:count,
    } as ReviewListResponseDto;

  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not query reviews!");
  }
}



export async function test(productId: number) {
  try {
    const reviews = await context.db.reviewRepository.find({where:{productId}, relations: ["product", "user"] });
    return await Promise.all(reviews.map(async review => {

      return {
        id: review.id,
        message: review.message,
        rating: review.rating,
        status: review.status,
        like: review.like,
        dislike: review.dislike,
        liked:review.liked,
        disliked:review.disliked,
        user : {
          id: review.user.id,
          firstName: review.user.firstName
        },
        product:{
          id: review.product.id,
          title: review.product.title,
        },

      } as ReviewResponseDto;
    }));
  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not query reviews!");
  }
}
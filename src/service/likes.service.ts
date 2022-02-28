import context from "../lib/context";
import {CreateLikeDto, UpdateLikeDto, DeleteLiketDto , QueryLikeDto, LikesResponseDto} from "../dto/likes.dto"
import {Likes} from "../db/entity/likes";




export async function createLike(createLikeDto:CreateLikeDto) {
    try {
        const review = await context.db.likesRepository.save({
            ...createLikeDto
        });
        return <LikesResponseDto>{
            deleted: review.deleted,
            reviewId: review.reviewId,
            userId: review.userId,
            reaction: review.reaction,
        }
    } catch (error) {
        context.logger.warn(error);
        throw new Error("like could not be created!")
    }
}


export async function deleteLike(reviewId: number,userId:string,reaction:boolean) {
    try {
        const del = await context.db.likesRepository.delete({ reviewId: reviewId , userId:userId, reaction:reaction})
        if (del.affected === 1) {
            return del;
        }else {
            throw new Error("like not found!");
        }

    } catch (e) {
        context.logger.warn(e);
        throw new Error("like could not be deleted!");
    }
}
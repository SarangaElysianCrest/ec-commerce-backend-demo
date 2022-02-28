import {CreatePromoCodeDto,DeletePromoCodeDto,ResponsePromoCodeDto,UpdatePromoCodeDto} from "../dto/promocode.dto";
import context from "../lib/context";

export async function createPromoCode(createPromoCodeDto : CreatePromoCodeDto){
    try {
        const promo = await context.db.promoCodeRepository.save({
                ...createPromoCodeDto
        });
        return <ResponsePromoCodeDto>{
            ...promo
        };
    }catch (e) {
        context.logger.warn(e);
        throw new Error("promo code could not be created!")
    }
}


export async function updatePromoCode(updatePromoCodeDto:UpdatePromoCodeDto){
    try {
        const {id, ...updateObj} = updatePromoCodeDto;
        const promo = await context.db.promoCodeRepository.findOne(id);
        if (!promo){
            throw new Error("promo code not found")
        }
        Object.keys(updateObj).forEach(k => {
            (promo as any)[k] = (updateObj as any)[k];
        });
        const updatedPromo = await context.db.promoCodeRepository.save(promo);
        return <UpdatePromoCodeDto>{
            ...updatedPromo
        };
    }catch (e) {
        context.logger.warn(e);
        throw new Error("promo code could not be updated!")
    }
}



export async function deletePromoCode(deletePromoCodeDto: DeletePromoCodeDto) {
    try {
        const deleteResult = await context.db.promoCodeRepository.delete(deletePromoCodeDto.id);
        if (deleteResult.affected == 1) {
            return;
        }
        throw new Error("promo code not found!");
    } catch (e) {
        context.logger.warn(e);
        throw new Error("promo code could not be deleted!");
    }
}

export async function getPromoCodeById(id: number) {
    try {
        const PromoCode = await context.db.promoCodeRepository.findOne(id);
        if (!PromoCode) {
            throw new Error("promo code not found!");
        }
        return <ResponsePromoCodeDto>{
            ...PromoCode
        };
    } catch (e) {
        context.logger.warn(e);
        throw new Error("user not found!");
    }
}


export async function queryPromoCode(promoCodeName:string,total:number){

    try {
        const promoCode = await context.db.promoCodeRepository.createQueryBuilder("promo_code")
            .where("promo_code.promoCodeName = :PromoCodeName",{PromoCodeName:promoCodeName })
            .andWhere("promo_code.validDate  >= :currentDate",{currentDate:new Date()})
            .getManyAndCount()


        if (!promoCode) {
            throw new Error("promo code not found!");
        }

        if (promoCode[1] === 0){
            const result = {
                status:"invalid"
            }
            return result as ResponsePromoCodeDto;
        }else {
            let rate;
            let discount;
            let discountedSum = total;
            let maxDiscount;
            promoCode[0].map(r => {
                rate = r.discountPrice;
                discount = r.type==="flat"? rate : total*rate;
                maxDiscount = r.MaxDiscount
                if(discount > maxDiscount){
                    discountedSum = discountedSum - maxDiscount;
                }else{
                    discountedSum = discountedSum - discount;
                }
            })
            const result = {
                discountedTotal:discountedSum,
                status:"valid",
                discountPrice: total - discountedSum,
            }
            return result as ResponsePromoCodeDto;
        }

    }catch (e) {
        context.logger.warn(e);
        throw new Error("could not query coupons!");
    }
}
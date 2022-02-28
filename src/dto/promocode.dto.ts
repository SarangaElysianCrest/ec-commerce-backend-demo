export interface CreatePromoCodeDto {
    promoCodeName:string;
    validDate:Date;
    discountPrice:number;
    MaxDiscount:number;
    type:string;
}

export interface UpdatePromoCodeDto {
    id:number;
    promoCodeName:string;
    validDate:Date;
    discountPrice:number;
    MaxDiscount:number;
    type:string;
}

export interface DeletePromoCodeDto {
    id:number;
}

export interface ResponsePromoCodeDto {
    id:number;
    promoCodeName:string;
    validDate:Date;
    discountPrice:number;
    MaxDiscount:number;
    type:string;
    total:number;
    discountedTotal:number;
    status:string
}


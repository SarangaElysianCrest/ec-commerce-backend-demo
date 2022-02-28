import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "promo_code"
})
export class PromoCode {
    @PrimaryGeneratedColumn("increment")
    public id!: number;

    @Column("varchar", { length: 255 })
    public promoCodeName!: string;

    @Column()
    public validDate!: Date;

    @Column("double")
    public discountPrice!: number;

    @Column("double")
    public MaxDiscount!: number;

    @Column("varchar", { length: 255 })
    public type!: string;
};
import {
    Column, CreateDateColumn,
    Entity, Generated, JoinColumn, ManyToOne,
    OneToMany, PrimaryColumn,
} from "typeorm";
import { OrderItemsCreateDto } from "../../dto/orderItems.dto";
import {OrderItem} from "./orderItem";
import {Product} from "./product";

@Entity({
    name: "order"
})
export class Order {
    @PrimaryColumn("varchar",{ nullable: false })
    public id!: string;

    @Column("varchar",{ nullable: false })
    public userId!: string;

    @Column("varchar", { length: 255, nullable: false })
    public firstname!: string;

    @Column("varchar", { length: 255, nullable: false })
    public lastname!: string;

    @Column("varchar", { length: 255, nullable: true })
    public companyName!: string;

    @Column("varchar", { length: 255, nullable: false })
    public addressLine1!: string;

    @Column("varchar", { length: 255, nullable: false })
    public addressLine2!: string;

    @Column("varchar", { length: 255, nullable: false })
    public city!: string;

    @Column("varchar", { length: 255, nullable: false })
    public province!: string;

    @Column("varchar", { length: 255, nullable: false })
    public postcode!: string;

    @Column("varchar", { length: 255, nullable: false })
    public country!: string;

    @Column("varchar", { length: 255, nullable: false })
    public phone!: string;

    @Column("varchar", { length: 255, nullable: false })
    public email!: string;

    @Column("varchar", { length: 255, nullable: true })
    public notes!: string;

    @Column("decimal", { precision: 8, scale: 2 })
    public total!: number;

    @Column("varchar", { length: 255, nullable: false })
    public currency!: string;

    @Column("varchar", { length: 255, nullable: false })
    public rate!: number;

    @Column("varchar", { length: 255, nullable: false })
    public type!: string;

    @Column("varchar", { nullable: false})
    public status!: number;

    @CreateDateColumn()
    public createdAt!: Date;

    @OneToMany(type => OrderItem, o=> o.order)
    public items!: OrderItem[];
}
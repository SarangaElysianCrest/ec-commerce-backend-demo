import {
    Column,
    Entity, Generated, JoinColumn, ManyToOne, OneToMany,
    OneToOne,
    PrimaryColumn,

} from "typeorm";
import {Order} from "./order";

@Entity({
    name: "order_item"
})
export class OrderItem {
    @PrimaryColumn("varchar", { nullable: false })
    @Generated('uuid')
    public id!: string;

    @ManyToOne(type => Order, pv => pv.id)
    @JoinColumn({ name: "order",referencedColumnName:'id' })
    public order!: string;

    @Column("varchar", { length: 255, nullable: false })
    public productId!: string;

    @Column("varchar", { length: 255, nullable: false })
    public name!: string;

    @Column("varchar", { length: 255, nullable: false })
    public sku!: string;

    @Column("varchar", { length: 255, nullable: false })
    public variant!: string ;

    @Column("varchar", { length: 255, nullable: false })
    public price!: number ;

    @Column({ nullable: false })
    public quantity!: number;    
}
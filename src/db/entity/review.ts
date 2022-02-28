import { Column, Entity, PrimaryGeneratedColumn,OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Likes } from "./likes";
import { Product } from "./product";
import { User } from "./user";


@Entity({
    name: "review"
  })
  export class Review {
    @PrimaryGeneratedColumn("increment")
    public id!: number;
  
    @Column("varchar", { length: 255, nullable: false })
    public message!: string;

    @Column("varchar", {nullable: false})
    public rating!: number;

    @Column("varchar", {nullable: false})
    public status!: number;    

    @Column("varchar", {nullable: false})
    public like!: number;    

    @Column("varchar", {nullable: false})
    public dislike!: number;   

    @Column({ nullable: false })
    public userId!: string;
  
    @ManyToOne(type => User, user=> user.reviews)
    @JoinColumn({ name: "userId" })
    public user!: User;

    @Column({ nullable: false })
    public productId!: number;
  
    @ManyToOne(type => Product, product=> product.reviews)
    @JoinColumn({ name: "productId" })
    public product!: Product;

    @OneToMany(type => Likes, likes => likes.review)
    public likes!: Likes [];

    @Column({ nullable: false ,default: false})
    public liked!: boolean;

    @Column({ nullable: false, default: false })
    public disliked!: boolean;



};
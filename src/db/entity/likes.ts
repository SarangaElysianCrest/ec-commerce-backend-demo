import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
  import { Review } from "./review";
  import { VariantAttribute } from "./variantAttribute";
  import {Product} from "./product";
import {User} from "./user";
  
  @Entity({
    name: "likes"
  })
  export class Likes {
  
    @PrimaryGeneratedColumn("increment")
    public id!: number;
  
    @Column({ nullable: false })
    public deleted!: boolean;

    @Column({ nullable: false })
    public reaction!: boolean;
  
    @Column({ nullable: false })
    public reviewId!: number;

    @ManyToOne(type => Review, review=> review.likes)
    @JoinColumn({ name: "reviewId" })
    public review!: Review;

      // this should be string have to fixed
    @Column({ nullable: false })
    public userId!: string;

    @ManyToOne(type => User, user=> user.reviews)
    @JoinColumn({ name: "userId" })
    public user!: User;
  };
  
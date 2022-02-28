import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Product } from "./product";
import { VariantAttribute } from "./variantAttribute";

@Entity({
  name: "variants"
})
export class Variant {

  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column({ nullable: false })
  public stock!: number;

  @Column("double")
  public price!: number;

  @Column("double")
  public discount!: number;

  @Column("datetime", { nullable: true })
  public offerEnd!: Date;

  @Column("varchar", { length: 255 })
  public image!: string;

  @DeleteDateColumn()
  public deletedAt!: Date;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @Column({ nullable: false })
  public productId!: number;
  
  @ManyToOne(type => Product, product => product.variants)
  public product!: Product;

  @OneToMany(type => VariantAttribute, pva => pva.variant)
  public attributes!: Promise<VariantAttribute[]>;



};

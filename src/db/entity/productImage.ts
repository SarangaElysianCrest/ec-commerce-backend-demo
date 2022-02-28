import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity({
  name: "product_images"
})
export class ProductImage {

  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("varchar", { length: 500, nullable: false })
  public url!: string;

  @Column({ nullable: false })
  public productId!: number;

  @ManyToOne(type => Product, product => product.images)
  public product!: Product;

};

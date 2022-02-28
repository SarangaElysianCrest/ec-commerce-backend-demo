import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity({
  name: "tags"
})
export class Tag {

  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("varchar", { length: 255, nullable: false, unique: true })
  public name!: string;

  @ManyToMany(type => Product, p => p.tags)
  public products!: Promise<Product>;

};

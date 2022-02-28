import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "./attribute";
import { Category } from "./category";

@Entity({
  name: "category_attributes"
})
export class CategoryAttribute {

  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("int")
  public order!: number;

  @Column()
  public attributeId!: number;

  @Column()
  public categoryId!: number;

  @ManyToOne(type => Attribute)
  @JoinColumn({ name: "attributeId" })
  public attribute!: Attribute;

  @ManyToOne(type => Category)
  @JoinColumn({ name: "categoryId" })
  public category!: Category;

};

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "./attribute";
import { SubCategory } from "./subCategory";

@Entity({
  name: "sub_category_attributes"
})
export class SubCategoryAttribute {

  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("int")
  public order!: number;

  @Column()
  public attributeId!: number;

  @Column()
  public subCategoryId!: number;

  @ManyToOne(type => Attribute)
  @JoinColumn({ name: "attributeId" })
  public attribute!: Attribute;

  @ManyToOne(type => SubCategory)
  @JoinColumn({ name: "subCategoryId" })
  public subCategory!: SubCategory;

};

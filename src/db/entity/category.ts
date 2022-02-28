import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubCategory } from "./subCategory";
import { CategoryAttribute } from "./categoryAttribute";

@Entity({
  name: "categories"
})
export class Category {

  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("varchar", { length: 255, nullable: false, unique: true })
  public name!: string;

  @OneToMany(type => SubCategory, subCat => subCat.category)
  public subCategories!: Promise<SubCategory[]>;

  @OneToMany(type => CategoryAttribute, ca => ca.category)
  public attributes!: Promise<CategoryAttribute[]>;

};

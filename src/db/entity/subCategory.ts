import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { SubCategoryAttribute } from "./subCategoryAttribute";

@Entity({
  name: "sub_categories"
})
export class SubCategory {

  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("varchar", { length: 255, nullable: false, unique: true })
  public name!: string;

  @Column({ nullable: false })
  public categoryId!: number;

  @ManyToOne(type => Category, cat => cat.subCategories)
  @JoinColumn({ name: "categoryId" })
  public category!: Category;

  @OneToMany(type => SubCategoryAttribute, ca => ca.subCategory)
  public attributes!: Promise<SubCategoryAttribute[]>;

};

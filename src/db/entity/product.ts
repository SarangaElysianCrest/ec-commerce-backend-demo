import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Variant } from "./variant";
import { ProductImage } from "./productImage";
import { Tag } from "./tag";
import { Category } from "./category";
import { SubCategory } from "./subCategory";
import { Review } from "./review";

@Entity({
  name: "products"
})
export class Product {

  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("varchar", { length: 255, nullable: false })
  public sku!: string;

  @Index({ fulltext: true })
  @Column("varchar", { length: 255, nullable: false })
  public title!: string;

  @Index({ fulltext: true })
  @Column("text", { nullable: false })
  public description!: string;

  @Column({ nullable: false })
  public stock!: number;

  @Column("double")
  public price!: number;

  @Column("double")
  public discount!: number;

  @Column("datetime", { nullable: true })
  public offerEnd!: Date;

  @Column({ default: true })
  public new!: boolean;

  @Column({ default: 0 })
  public rating!: number;

  @DeleteDateColumn()
  public deletedAt!: Date;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @Column()
  public categoryId!: number;

  @Column()
  public subCategoryId!: number;

  @ManyToOne(type => Category)
  @JoinColumn({ name: "categoryId" })
  public category!: Category;

  @ManyToOne(type => SubCategory)
  @JoinColumn({ name: "subCategoryId" })
  public subCategory!: SubCategory;


  @ManyToOne(type => Tag)
  @JoinColumn({ name: "tagId" })
  public tag!: Tag;

  @ManyToMany(type => Tag, tag => tag.products)
  @JoinTable()
  public tags!: Promise<Tag[]>;

  @OneToMany(type => Variant, pv => pv.product)
  public variants!: Promise<Variant[]>;

  @OneToMany(type => ProductImage, pv => pv.product)
  public images!: Promise<ProductImage[]>;

  @OneToMany(type => Review, review => review.product)
  public reviews!: Promise<Review[]>;

  
};

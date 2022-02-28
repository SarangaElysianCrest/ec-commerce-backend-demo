import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "./attribute";
import { Variant } from "./variant";

@Entity({
  name: "variant_attributes"
})
@Index(["attributeId", "variantId"], { unique: true })
export class VariantAttribute {

  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("varchar", { length: 255 })
  public value!: string;

  @Column()
  public attributeId!: number;

  @Column()
  public variantId!: number;

  @ManyToOne(type => Attribute)
  @JoinColumn({ name: "attributeId" })
  public attribute!: Attribute;

  @ManyToOne(type => Variant, productVariant => productVariant.attributes)
  @JoinColumn({ name: "variantId" })
  public variant!: Variant;

};

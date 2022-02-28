import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum AttributeType {
  // general
  COLOR = "COLOR",
  TEXT = "TEXT"
}


@Entity({
  name: "attributes"
})
export class Attribute {

  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("varchar", { length: 255, nullable: false, unique: true })
  public name!: string;

  @Column("varchar", { length: 255, nullable: false })
  public label!: string;

  @Column("varchar", { length: 255, nullable: false, default: AttributeType.TEXT })
  public type!: AttributeType;

}

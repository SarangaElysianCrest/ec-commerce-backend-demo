import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "brands"
})
export class Brand {

  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("varchar", { length: 255, nullable: false, unique: true })
  public name!: string;

};

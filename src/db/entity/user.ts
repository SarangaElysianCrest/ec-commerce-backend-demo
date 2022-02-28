import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, IsPhoneNumber, IsUUID } from "class-validator";
import { Review } from "./review";
import {Likes} from "./likes";


@Entity({
  name: "users"
})
export class User {
  

  @Column("varchar", { length: 255, nullable: false, unique: true })
  @PrimaryColumn()
  public id!: string;

  @Column("varchar", { length: 255, nullable: false, unique: true })
  @IsEmail()
  public email!: string;

  @Column("varchar", { length: 255 })
  public firstName!: string;

  @Column("varchar", { length: 255 })
  public lastName!: string;

  @Column("varchar", { length: 255 })
  @IsPhoneNumber("LK")
  public phone!: string;

  @Column("varchar", { length: 255 })
  @IsPhoneNumber("LK")
  public homePhone!: string;

  @Column("varchar", { length: 255 })
  public addressLine1!: string;

  @Column("varchar", { length: 255 })
  public addressLine2!: string;

  @Column("varchar", { length: 255 })
  public city!: string;

  @Column("varchar", { length: 255 })
  public province!: string;

  @Column("varchar", { length: 255 })
  public postalCode!: string;
  @CreateDateColumn()
  public createAt!: Date;

  @UpdateDateColumn()
  public updateAt!: Date;

  @OneToMany(type => Review, review => review.user)
  public reviews!: Promise<Review[]>;

  @OneToMany(type => Likes, likes => likes.user)
  public likes!: Promise<Likes[]>;

  // @OneToMany(type => Likes, likes => likes.user)
  // public likes!: Promise<Likes[]>;

};

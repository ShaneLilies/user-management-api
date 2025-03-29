import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm";

export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}

@Entity()
export class User extends BaseModel {

  @Column({ nullable: false })
  firstname!: string;

  @Column({ nullable: false })
  lastname!: string;

  @Column({ nullable: false })
  username!: string;

}
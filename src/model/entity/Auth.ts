import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "admin" })
export class Admin extends BaseEntity {
  @ObjectIdColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

}

import { Entity, Column } from "typeorm";
import { Tree } from "./Tree";

@Entity()
export class AppleTree extends Tree {
  @Column()
  type!: "Apple";
}

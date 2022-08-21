import { Entity, Column } from "typeorm";
import { Tree } from "./Tree";

@Entity()
export class PoplarTree extends Tree {
  @Column()
  type!: "Poplar";
}

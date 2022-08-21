import { Entity, Column } from "typeorm";
import { Tree } from "./Tree";

@Entity()
export class ConiferTree extends Tree {
  @Column()
  type!: "Conifer";
}

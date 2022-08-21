import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Certificate extends BaseEntity {
  @ObjectIdColumn()
  id!: string;

  @Column()
  createdAt!: number;

  @Column()
  latitude!: string;

  @Column()
  longitude!: string;

  @Column()
  country!: string;

  @Column()
  state!: string;

  @Column()
  metadata!: string;

  @Column()
  numTrees!: number;

  @Column()
  treeStart!: number

  @Column()
  treeEnd!: number

  @Column()
  totalOffsetCapacity!: number;

  @Column()
  tokenId?: number;
}

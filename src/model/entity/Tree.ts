import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Tree extends BaseEntity {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  location!: string;

  @Column()
  latitude!: string;

  @Column()
  longitude!: string;

  @Column()
  country!: string;

  @Column()
  state!: string;

  @Column()
  index!: number;

  @Column()
  serialNumber!: number;

  @Column({ nullable: true })
  metadata?: string;

  @Column()
  sold!: boolean;

  @Column()
  lifeSpan!: string;

  @Column()
  offsetCapacity!: number;

  @Column()
  alive?: boolean
}

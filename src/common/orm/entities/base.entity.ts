import {
  Entity,
  PrimaryKey,
  Property,
  BaseEntity as BaseEntityORM,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ abstract: true })
export abstract class BaseEntity extends BaseEntityORM<BaseEntity, 'id'> {
  @PrimaryKey()
  id: string = v4();

  @Property({
    length: 3,
    onCreate: () => new Date(),
  })
  createdAt = new Date();

  @Property({
    length: 3,
    onUpdate: () => new Date(),
  })
  updatedAt = new Date();

  @Property({
    // @todo: implement soft delete
    length: 3,
    nullable: true,
    columnType: 'date',
  })
  deletedAt?: Date;

  constructor() {
    super();
    this.id = v4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public softRemove(): void {
    this.deletedAt = new Date();
  }
}

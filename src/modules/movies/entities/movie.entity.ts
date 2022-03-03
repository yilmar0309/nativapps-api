import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/orm/entities/base.entity';

@Entity({ tableName: 'movie' })
export class MovieEntity extends BaseEntity {
  @Property()
  imdbID?: string;

  @Property()
  Title?: string;

  @Property()
  Year?: string;

  @Property()
  Type?: string;

  @Property()
  Poster?: string;
}

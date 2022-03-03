import { EntityRepository } from '@mikro-orm/mysql';
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseRepository<
  T extends BaseEntity,
> extends EntityRepository<T> {}

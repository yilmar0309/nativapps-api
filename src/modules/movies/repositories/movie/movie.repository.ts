import { MovieEntity } from '../../entities/movie.entity';
import { Repository } from '@mikro-orm/core';
import { BaseRepository } from '../../../../common/orm/repositories/base.repository';

@Repository(MovieEntity)
export class MovieRepository extends BaseRepository<MovieEntity> {
  public async getAllMovie(): Promise<MovieEntity[]> {
    return this.findAll();
  }

  public async createMovie(movie: MovieEntity): Promise<void> {
    const newMovie = Object.assign(new MovieEntity(), movie);
    await this.persistAndFlush(newMovie);
  }
}

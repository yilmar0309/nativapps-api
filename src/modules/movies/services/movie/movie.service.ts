import { Injectable } from '@nestjs/common';
import { ResponseMessage } from 'src/common/interfaces/http.interface';
import { MovieEntity } from '../../entities/movie.entity';
import { MovieRepository } from '../../repositories/movie/movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  public async getAllMovie(): Promise<MovieEntity[]> {
    return await this.movieRepository.getAllMovie();
  }

  public async createMovie(movie: MovieEntity): Promise<ResponseMessage> {
    await this.movieRepository.createMovie(movie);
    return { message: 'created' };
  }
}

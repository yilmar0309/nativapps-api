import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../../../../common/decorators/auth/public.decorator';
import { MovieService } from '../../services/movie/movie.service';
import { MovieEntity } from '../../entities/movie.entity';
import { ResponseMessage } from 'src/common/interfaces/http.interface';

@Controller('movie')
export class MovieController {
  //@todo: remove auth service and use a specific decorator
  constructor(private readonly movieService: MovieService) {}

  @Public()
  @Get('get_all_movie')
  async getAllMovie(): Promise<MovieEntity[]> {
    return await this.movieService.getAllMovie();
  }

  @Public()
  @Post('create_movie')
  async createMovie(@Body() body): Promise<ResponseMessage> {
    return await this.movieService.createMovie(body);
  }
}

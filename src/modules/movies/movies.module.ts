import { Module } from '@nestjs/common';
import { MovieService } from './services/movie/movie.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MovieEntity } from './entities/movie.entity';
import { MovieController } from './controllers/movie/movie.controller';

@Module({
  imports: [MikroOrmModule.forFeature([MovieEntity])],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MoviesModule {}

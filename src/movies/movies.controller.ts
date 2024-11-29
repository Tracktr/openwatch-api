import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getMany() {
    return this.moviesService.findMany();
  }

  @Get(':movie')
  async getFirst(@Param('movie') movie: string) {
    const streamingServices = await this.moviesService.findFirst(movie);
    return streamingServices;
  }

  @Post()
  async createMovie(
    @Body()
    createMovieDto: {
      title: string;
      releaseYear: number;
      streamingServiceId: number;
    },
  ) {
    return this.moviesService.createMovie(createMovieDto);
  }
}

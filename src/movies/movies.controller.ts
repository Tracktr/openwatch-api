import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getMany() {
    return this.moviesService.findMany();
  }

  @Get(':id')
  async getFirst(@Param('id') id: number) {
    const streamingServices = await this.moviesService.findFirst(id);
    return streamingServices;
  }

  @Post()
  @UseGuards(AuthGuard)
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

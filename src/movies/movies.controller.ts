import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getMany(@Query('country') country?: string) {
    return this.moviesService.findMany(country);
  }

  @Get(':id')
  async getFirst(@Param('id') id: number, @Query('country') country?: string) {
    const streamingServices = await this.moviesService.findFirst(id, country);
    return streamingServices;
  }

  @Post()
  @UseGuards(AuthGuard)
  async createMovie(
    @Body()
    createMovieDto: {
      title: string;
      releaseYear: number;
      availability: {
        streamingServiceId: number;
        country: string;
      }[];
    },
  ) {
    return this.moviesService.createMovie(createMovieDto);
  }
}

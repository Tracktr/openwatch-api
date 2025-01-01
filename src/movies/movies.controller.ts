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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { CreateMovieDto, GetMoviesDto, MovieDto } from './movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOkResponse({
    type: GetMoviesDto,
  })
  async getMany(@Query('country') country?: string) {
    return this.moviesService.findMany(country);
  }

  @Get(':id')
  @ApiOkResponse({
    type: MovieDto,
  })
  async getFirst(@Param('id') id: number, @Query('country') country?: string) {
    return await this.moviesService.findFirst(id, country);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    type: MovieDto,
  })
  @ApiSecurity('x-access-token')
  async createMovie(
    @Body()
    createMovieDto: CreateMovieDto,
  ) {
    return this.moviesService.createMovie(createMovieDto);
  }
}

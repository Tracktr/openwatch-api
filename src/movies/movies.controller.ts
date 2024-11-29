import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // Endpoint to get streaming services for a specific movie
  @Get(':title/streaming-services')
  async getStreamingServices(@Param('title') title: string) {
    const streamingServices =
      await this.moviesService.findStreamingServicesForMovie(title);
    return streamingServices;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StreamingServicesService } from './streaming-services.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('streaming-services')
export class StreamingServicesController {
  constructor(
    private readonly streamingServicesService: StreamingServicesService,
  ) {}

  @Get()
  async getMany(@Query('country') country?: string) {
    return this.streamingServicesService.findMany(country);
  }

  @Get(':id')
  async getFirst(@Param('id') id: number, @Query('country') country?: string) {
    return this.streamingServicesService.findFirst(id, country);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body()
    createStreamingServiceDto: {
      name: string;
      logoUrl: string;
      country: string;
    },
  ) {
    return this.streamingServicesService.create(createStreamingServiceDto);
  }
}

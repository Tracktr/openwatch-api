import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StreamingServicesService } from './streaming-services.service';

@Controller('streaming-services')
export class StreamingServicesController {
  constructor(
    private readonly streamingServicesService: StreamingServicesService,
  ) {}

  @Get()
  async getMany() {
    return this.streamingServicesService.findMany();
  }

  @Get(':id')
  async getFirst(@Param('id') id: number) {
    return this.streamingServicesService.findFirst(id);
  }

  @Post()
  async create(
    @Body() createStreamingServiceDto: { name: string; logoUrl: string },
  ) {
    return this.streamingServicesService.create(createStreamingServiceDto);
  }
}

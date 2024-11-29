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

  @Get(':name')
  async getFirst(@Param('name') name: string) {
    return this.streamingServicesService.findFirst(name);
  }

  @Post()
  async create(
    @Body() createStreamingServiceDto: { name: string; logoUrl: string },
  ) {
    return this.streamingServicesService.create(createStreamingServiceDto);
  }
}

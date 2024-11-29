import { Controller, Get, Param } from '@nestjs/common';
import { StreamingServicesService } from './streaming-services.service';

@Controller('streaming-services')
export class StreamingServicesController {
  constructor(
    private readonly streamingServicesService: StreamingServicesService,
  ) {}

  // Endpoint to get streaming service details by name
  @Get(':name')
  async getStreamingService(@Param('name') name: string) {
    return this.streamingServicesService.findByName(name);
  }
}

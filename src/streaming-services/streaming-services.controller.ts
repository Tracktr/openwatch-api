import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { StreamingServicesService } from './streaming-services.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateStreamingServiceDto,
  GetStreamingServicesDto,
  StreamingServiceDto,
} from './streaming-services.dto';

@Controller('streaming-services')
export class StreamingServicesController {
  constructor(
    private readonly streamingServicesService: StreamingServicesService,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetStreamingServicesDto,
  })
  async getMany(@Query('country') country?: string) {
    return this.streamingServicesService.findMany(country);
  }

  @Get(':id')
  @ApiOkResponse({
    type: StreamingServiceDto,
  })
  async getFirst(@Param('id') id: number, @Query('country') country?: string) {
    return this.streamingServicesService.findFirst(id, country);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    type: StreamingServiceDto,
  })
  @ApiSecurity('x-access-token')
  async create(@Body() createStreamingServiceDto: CreateStreamingServiceDto) {
    return this.streamingServicesService.create(createStreamingServiceDto);
  }
}

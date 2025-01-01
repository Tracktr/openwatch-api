import { Controller, Post, Body } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ApplicationDto, CreateApplicationDto } from './applications.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('')
  @ApiCreatedResponse({
    type: ApplicationDto,
  })
  async createApplication(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.createApplication(
      createApplicationDto.name,
    );
  }
}

import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { ApplicationDto, CreateApplicationDto } from './applications.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('')
  @ApiCreatedResponse({
    type: ApplicationDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('Bearer')
  async createApplication(
    @Body() createApplicationDto: CreateApplicationDto,
    @Request() req,
  ) {
    return this.applicationsService.createApplication(
      createApplicationDto.name,
      req.user,
    );
  }
}

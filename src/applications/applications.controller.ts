import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiResponseProperty,
} from '@nestjs/swagger';
import {
  ApplicationDto,
  CreateApplicationDto,
  GetApplicationsDto,
} from './applications.dto';
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

  @Get('')
  @ApiResponse({
    type: GetApplicationsDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('Bearer')
  async getApplications(@Request() req) {
    return this.applicationsService.getApplications(req.user);
  }

  @Get(':id')
  @ApiResponseProperty({
    type: ApplicationDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('Bearer')
  async getApplicationById(@Param('id') id: string, @Request() req) {
    return this.applicationsService.getApplicationById(id, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('Bearer')
  async deleteApplication(@Param('id') id: string, @Request() req) {
    return this.applicationsService.deleteApplication(id, req.user);
  }
}

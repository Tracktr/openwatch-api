import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApplicationDto,
  CreateApplicationDto,
  GetApplicationsDto,
  CreateApiKeyDto,
  ApiKeyDto,
} from './applications.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('applications')
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

  @Post(':id/api-keys')
  @ApiCreatedResponse({
    type: ApiKeyDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('Bearer')
  async createApiKey(
    @Param('id') id: string,
    @Body() createApiKeyDto: CreateApiKeyDto,
    @Request() req,
  ) {
    return this.applicationsService.createApiKey(
      id,
      req.user,
      createApiKeyDto.name,
    );
  }

  @Patch(':id/api-keys/:key')
  @ApiResponse({
    type: ApiKeyDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('Bearer')
  async toggleApiKeyStatus(
    @Param('id') id: string,
    @Param('key') key: string,
    @Request() req,
  ) {
    console.log(key);
    return this.applicationsService.toggleApiKeyStatus(id, key, req.user);
  }

  @Delete(':id/api-keys/:key')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('Bearer')
  async deleteApiKey(
    @Param('id') id: string,
    @Param('key') key: string,
    @Request() req,
  ) {
    return this.applicationsService.deleteApiKey(id, key, req.user);
  }
}

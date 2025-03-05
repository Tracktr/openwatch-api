import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

// Create Application DTO
const createApplicationSchema = z.object({
  name: extendApi(z.string().min(1), {
    description: 'Application name',
    example: 'My Application',
  }),
});

export class CreateApplicationDto extends createZodDto(
  createApplicationSchema,
) {}

// API Key DTOs
const createApiKeySchema = z.object({
  name: extendApi(z.string().optional().default('Default Key'), {
    description: 'Name of the API key',
    example: 'Production Key',
  }),
});

export class CreateApiKeyDto extends createZodDto(createApiKeySchema) {}

// Response DTOs
const apiKeyDtoSchema = z.object({
  id: extendApi(z.number(), {
    description: 'API key ID',
  }),
  name: extendApi(z.string(), {
    description: 'API key name',
  }),
  enabled: extendApi(z.boolean(), {
    description: 'Whether the API key is enabled',
  }),
  createdAt: extendApi(z.date(), {
    description: 'When the API key was created',
  }),
  key: extendApi(z.string().optional(), {
    description: 'The API key value (only provided when creating new keys)',
  }),
});

export class ApiKeyDto extends createZodDto(apiKeyDtoSchema) {}

const applicationDtoSchema = z.object({
  id: extendApi(z.string(), {
    description: 'Application ID',
  }),
  name: extendApi(z.string(), {
    description: 'Application name',
  }),
  apiKey: extendApi(z.string().optional(), {
    description: 'API key (only returned when creating a new application)',
  }),
  apiKeys: extendApi(z.array(apiKeyDtoSchema).optional(), {
    description: 'List of API keys for this application',
  }),
});

export class ApplicationDto extends createZodDto(applicationDtoSchema) {}

const getApplicationsDtoSchema = z.object({
  applications: extendApi(z.array(applicationDtoSchema), {
    description: 'List of user applications',
  }),
});

export class GetApplicationsDto extends createZodDto(
  getApplicationsDtoSchema,
) {}

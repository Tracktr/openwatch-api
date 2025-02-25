import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const CreateApplicationSchema = z.object({
  name: z.string().min(1),
});

export class CreateApplicationDto extends createZodDto(
  CreateApplicationSchema,
) {}

const ApplicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  apiKey: z.object({
    key: z.string(),
  }),
});

const GetApplicationsSchema = extendApi(
  z.object({
    applications: ApplicationSchema.array(),
  }),
);

export class GetApplicationsDto extends createZodDto(GetApplicationsSchema) {}

export class ApplicationDto extends createZodDto(ApplicationSchema) {}

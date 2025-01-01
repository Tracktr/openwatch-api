import { createZodDto } from '@anatine/zod-nestjs';
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
  apiKey: z.string(),
});

export class ApplicationDto extends createZodDto(ApplicationSchema) {}

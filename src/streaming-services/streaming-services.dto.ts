import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const StreamingServiceBaseSchema = extendApi(
  z.object({
    id: z.number(),
    name: z.string(),
    logoUrl: z.string(),
  }),
);

const StreamingServiceAvailabilityBaseSchema = extendApi(
  z.object({
    movie: z.object({
      id: z.number(),
      title: z.string(),
      releaseYear: z.number(),
    }),
  }),
);

const StreamingServiceWithAvailabilitySchema =
  StreamingServiceBaseSchema.extend({
    availability: z.array(StreamingServiceAvailabilityBaseSchema),
  });

const GetStreamingServicesSchema = extendApi(
  z.object({
    streamingServices: StreamingServiceWithAvailabilitySchema.array(),
  }),
);

export class StreamingServiceDto extends createZodDto(
  StreamingServiceWithAvailabilitySchema,
) {}

export class CreateStreamingServiceDto extends createZodDto(
  StreamingServiceBaseSchema.omit({ id: true }),
) {}

export class GetStreamingServicesDto extends createZodDto(
  GetStreamingServicesSchema,
) {}

export { StreamingServiceBaseSchema as StreamingServiceSchema };

import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { StreamingServiceSchema } from 'src/streaming-services/streaming-services.dto';
import { z } from 'zod';

const MovieAvailabilityBaseSchema = extendApi(
  z.object({
    streamingService: StreamingServiceSchema,
  }),
);

const MovieBaseSchema = extendApi(
  z.object({
    id: z.number(),
    title: z.string(),
    releaseYear: z.number(),
  }),
);

const CreateMovieAvailabilitySchema = extendApi(
  z.object({
    streamingServiceId: z.number(),
    country: z.string(),
  }),
);

const MovieWithAvailabilitySchema = MovieBaseSchema.extend({
  availability: MovieAvailabilityBaseSchema.array(),
});

const GetMoviesSchema = extendApi(
  z.object({
    movies: MovieWithAvailabilitySchema.array(),
  }),
);

export class MovieDto extends createZodDto(MovieWithAvailabilitySchema) {}

export class UpdateMovieDto extends createZodDto(
  MovieBaseSchema.omit({ id: true }),
) {}

export class CreateMovieDto extends createZodDto(
  MovieBaseSchema.omit({ id: true }).extend({
    availability: CreateMovieAvailabilitySchema.array(),
  }),
) {}

export class GetMoviesDto extends createZodDto(GetMoviesSchema) {}

export { MovieBaseSchema as MovieSchema };

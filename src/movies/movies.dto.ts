import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { StreamingServiceSchema } from 'src/streaming-services/streaming-services.dto';
import { z } from 'zod';

const MovieAvailabilityBaseSchema = extendApi(
  z.object({
    streamingService: StreamingServiceSchema,
    upvotes: z.number().optional(),
    downvotes: z.number().optional(),
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

const VoteAvailabilitySchema = extendApi(
  z.object({
    movieAvailabilityId: z.number(),
    isUpvote: z.boolean(),
  }),
);

const VoteResponseSchema = extendApi(
  z.object({
    movieAvailabilityId: z.number(),
    upvotes: z.number(),
    downvotes: z.number(),
    success: z.boolean(),
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

export class AddMovieAvailabilityDto extends createZodDto(
  CreateMovieAvailabilitySchema,
) {}

export class VoteAvailabilityDto extends createZodDto(VoteAvailabilitySchema) {}

export class VoteResponseDto extends createZodDto(VoteResponseSchema) {}

export { MovieBaseSchema as MovieSchema };

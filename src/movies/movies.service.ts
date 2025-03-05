import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  AddMovieAvailabilityDto,
  CreateMovieDto,
  VoteAvailabilityDto,
} from './movies.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async findMany(country: string) {
    try {
      const movies = await this.prisma.movie.findMany({
        where: {
          availability: {
            some: {
              country: country,
            },
          },
        },
        include: {
          availability: {
            select: {
              id: false,
              country: true,
              movieId: false,
              streamingService: true,
              _count: {
                select: {
                  upvotes: true,
                  downvotes: true,
                },
              },
            },
            where: {
              country: {
                mode: 'insensitive',
              },
            },
          },
        },
      });

      return { movies };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid country');
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException('No movies found');
      }
      throw error;
    }
  }

  async findFirst(id: number, country?: string) {
    try {
      const movie = await this.prisma.movie.findFirst({
        where: {
          id: Number(id),
          availability: {
            some: {
              country: country,
            },
          },
        },
        include: {
          availability: {
            select: {
              id: false,
              country: false,
              movieId: false,
              streamingService: true,
              _count: {
                select: {
                  upvotes: true,
                  downvotes: true,
                },
              },
            },
            where: {
              country: {
                mode: 'insensitive',
              },
            },
          },
        },
      });

      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      return movie;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid movie ID');
      }
      throw error;
    }
  }

  async createMovie(data: CreateMovieDto) {
    try {
      return await this.prisma.movie.create({
        data: {
          title: data.title,
          releaseYear: data.releaseYear,
          availability: {
            create: data.availability.map((movieAvailability) => ({
              country: movieAvailability.country,
              streamingService: {
                connect: { id: movieAvailability.streamingServiceId },
              },
            })),
          },
        },
        include: {
          availability: {
            select: {
              id: false,
              country: false,
              movieId: false,
              streamingService: true,
              _count: {
                select: {
                  upvotes: true,
                  downvotes: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid movie data');
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException('Unable to create movie');
      }
      throw error;
    }
  }

  async addAvailability(id: number, data: AddMovieAvailabilityDto) {
    try {
      return await this.prisma.movie.update({
        where: { id: Number(id) },
        data: {
          availability: {
            create: {
              country: data.country,
              streamingService: {
                connect: { id: data.streamingServiceId },
              },
            },
          },
        },
        include: {
          availability: {
            select: {
              id: false,
              country: true,
              movieId: false,
              streamingService: true,
              _count: {
                select: {
                  downvotes: true,
                  upvotes: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid availability data');
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Availability already exists');
        }
        throw new NotFoundException('Movie not found');
      }
      throw error;
    }
  }

  async voteAvailability(data: VoteAvailabilityDto) {
    try {
      if (data.isUpvote) {
        return await this.prisma.availabilityUpvote.create({
          data: {
            movieAvailabilityId: data.movieAvailabilityId,
          },
        });
      } else if (data.isUpvote === false) {
        return await this.prisma.availabilityDownvote.create({
          data: {
            movieAvailabilityId: data.movieAvailabilityId,
          },
        });
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid vote data');
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException('Movie availability not found');
      }
      throw error;
    }
  }
}

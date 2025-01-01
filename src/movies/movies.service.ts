import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMovieDto } from './movies.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async findMany(country: string) {
    return {
      movies: await this.prisma.movie.findMany({
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
              country: false,
              movieId: false,
              streamingService: true,
            },
            where: {
              country,
            },
          },
        },
      }),
    };
  }

  async findFirst(id: number, country?: string) {
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
          },
          where: {
            country,
          },
        },
      },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async createMovie(data: CreateMovieDto) {
    return this.prisma.movie.create({
      data: {
        title: data.title,
        releaseYear: data.releaseYear,
        availability: {
          create: data.availability.map((a) => ({
            country: a.country,
            streamingService: {
              connect: { id: a.streamingServiceId },
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
          },
        },
      },
    });
  }
}

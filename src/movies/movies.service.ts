import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async findMany(country?: string) {
    return this.prisma.movie.findMany({
      include: {
        availability: {
          include: {
            streamingService: true,
          },
          where: country
            ? {
                country: country,
              }
            : undefined,
        },
      },
    });
  }

  async findFirst(id: number, country?: string) {
    const movie = await this.prisma.movie.findFirst({
      where: { id },
      include: {
        availability: {
          include: {
            streamingService: true,
          },
          where: country
            ? {
                country: country,
              }
            : undefined,
        },
      },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async createMovie(data: {
    title: string;
    releaseYear: number;
    availability: {
      streamingServiceId: number;
      country: string;
    }[];
  }) {
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
          include: {
            streamingService: true,
          },
        },
      },
    });
  }
}

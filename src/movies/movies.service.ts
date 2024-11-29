import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async findMany() {
    return this.prisma.movie.findMany({
      include: { streamingServices: true },
    });
  }

  async findFirst(id: number) {
    const movie = await this.prisma.movie.findFirst({
      where: {
        id,
      },
      include: { streamingServices: true },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async createMovie(data: {
    title: string;
    releaseYear: number;
    streamingServiceId: number;
  }) {
    return this.prisma.movie.create({
      data: {
        title: data.title,
        releaseYear: data.releaseYear,
        streamingServices: {
          connect: { id: data.streamingServiceId },
        },
      },
    });
  }
}

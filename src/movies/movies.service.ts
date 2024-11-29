import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StreamingService } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async findStreamingServicesForMovie(
    title: string,
  ): Promise<StreamingService[]> {
    const movie = await this.prisma.movie.findFirst({
      where: { title },
      include: { streamingServices: true },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie.streamingServices;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateStreamingServiceDto } from './streaming-services.dto';

@Injectable()
export class StreamingServicesService {
  constructor(private prisma: PrismaService) {}

  async findMany(country: string) {
    return {
      streamingServices: await this.prisma.streamingService.findMany({
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
              streamingServiceId: false,
              movie: true,
            },
          },
        },
      }),
    };
  }

  async findFirst(id: number, country?: string) {
    const streamingService = await this.prisma.streamingService.findFirst({
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
            streamingServiceId: false,
            movie: true,
          },
        },
      },
    });

    if (!streamingService) {
      throw new NotFoundException('Streaming service not found');
    }

    return streamingService;
  }

  async create(data: CreateStreamingServiceDto) {
    return this.prisma.streamingService.create({
      data: {
        logoUrl: data.logoUrl,
        name: data.name,
      },
      include: {
        availability: {
          select: {
            id: false,
            country: false,
            movieId: false,
            streamingServiceId: false,
            movie: true,
          },
        },
      },
    });
  }
}

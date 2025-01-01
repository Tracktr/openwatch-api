import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StreamingServicesService {
  constructor(private prisma: PrismaService) {}

  async findMany(country?: string) {
    return this.prisma.streamingService.findMany({
      where: country
        ? {
            availability: {
              some: {
                country,
              },
            },
          }
        : undefined,
      include: {
        availability: {
          include: {
            movie: true,
          },
        },
      },
    });
  }

  async findFirst(id: number, country?: string) {
    const streamingService = await this.prisma.streamingService.findFirst({
      where: {
        id,
        availability: {
          some: {
            country,
          },
        },
      },
    });

    if (!streamingService) {
      throw new NotFoundException('Streaming service not found');
    }

    return streamingService;
  }

  async create(data: { name: string; logoUrl: string; country: string }) {
    return this.prisma.streamingService.create({ data });
  }
}

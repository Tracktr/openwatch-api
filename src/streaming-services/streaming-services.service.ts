import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StreamingServicesService {
  constructor(private prisma: PrismaService) {}

  async findMany() {
    return this.prisma.streamingService.findMany({
      include: { movies: true },
    });
  }

  async findFirst(name: string) {
    const streamingService = await this.prisma.streamingService.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    if (!streamingService) {
      throw new NotFoundException('Streaming service not found');
    }

    return streamingService;
  }

  async create(data: { name: string; logoUrl: string }) {
    return this.prisma.streamingService.create({ data });
  }
}

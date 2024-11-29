import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // PrismaService import

@Injectable()
export class StreamingServicesService {
  constructor(private prisma: PrismaService) {}

  // Fetch a streaming service by name
  async findByName(name: string) {
    return this.prisma.streamingService.findFirst({ where: { name } });
  }
}

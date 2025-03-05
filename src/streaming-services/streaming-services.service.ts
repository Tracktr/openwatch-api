import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateStreamingServiceDto } from './streaming-services.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StreamingServicesService {
  constructor(private prisma: PrismaService) {}

  async findMany(country: string) {
    try {
      const streamingServices = await this.prisma.streamingService.findMany({
        where: {
          availability: {
            some: {
              country: {
                equals: country,
                mode: 'insensitive',
              },
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

      if (!streamingServices || streamingServices.length < 1) {
        throw new NotFoundException('No streaming services found');
      }

      return { streamingServices };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid country');
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException('No streaming services found');
      }
      throw error;
    }
  }

  async findFirst(id: number, country?: string) {
    try {
      const streamingService = await this.prisma.streamingService.findFirst({
        where: {
          AND: [
            { id: Number(id) },
            country
              ? {
                  availability: {
                    some: {
                      country: {
                        equals: country,
                        mode: 'insensitive',
                      },
                    },
                  },
                }
              : {},
          ],
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid streaming service ID');
      }
      throw error;
    }
  }

  async create(data: CreateStreamingServiceDto) {
    try {
      return await this.prisma.streamingService.create({
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid streaming service data');
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException('Unable to create streaming service');
      }
      throw error;
    }
  }
}

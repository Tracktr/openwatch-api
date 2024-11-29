import { Module } from '@nestjs/common';
import { StreamingServicesController } from './streaming-services.controller';
import { StreamingServicesService } from './streaming-services.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StreamingServicesController],
  providers: [StreamingServicesService, PrismaService],
})
export class StreamingServicesModule {}

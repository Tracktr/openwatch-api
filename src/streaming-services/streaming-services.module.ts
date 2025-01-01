import { Module } from '@nestjs/common';
import { StreamingServicesController } from './streaming-services.controller';
import { StreamingServicesService } from './streaming-services.service';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [StreamingServicesController],
  providers: [StreamingServicesService, PrismaService, AuthGuard],
})
export class StreamingServicesModule {}

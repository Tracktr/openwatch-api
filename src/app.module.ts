import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { StreamingServicesModule } from './streaming-services/streaming-services.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [AuthModule, MoviesModule, StreamingServicesModule, ApplicationsModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    PrismaService,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { StreamingServicesModule } from './streaming-services/streaming-services.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApplicationsModule } from './applications/applications.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MoviesModule,
    StreamingServicesModule,
    ApplicationsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 10,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    PrismaService,
  ],
})
export class AppModule {}

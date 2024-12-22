import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [AuthModule],
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService, AuthGuard],
})
export class MoviesModule {}

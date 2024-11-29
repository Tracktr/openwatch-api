import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { StreamingServicesModule } from './streaming-services/streaming-services.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [MoviesModule, StreamingServicesModule],
  providers: [PrismaService],
})
export class AppModule {}

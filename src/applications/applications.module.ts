import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService, PrismaService, AuthService],
})
export class ApplicationsModule {}

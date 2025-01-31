import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    ConfigModule,
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [GoogleStrategy, PrismaService, AuthService],
})
export class AuthModule {}

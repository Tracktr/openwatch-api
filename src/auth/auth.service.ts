import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async generateAuthKey(applicationId: string): Promise<string> {
    const authKey = crypto.randomBytes(32).toString('hex');
    await this.prisma.apiKey.create({
      data: {
        key: authKey,
        applicationId,
      },
    });
    return authKey;
  }

  async validateAuthKey(authKey: string): Promise<boolean> {
    const key = await this.prisma.apiKey.findUnique({
      where: { key: authKey },
    });
    return !!key;
  }
}

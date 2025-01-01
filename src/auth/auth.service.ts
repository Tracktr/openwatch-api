import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async generateAuthKey(applicationId: number): Promise<string> {
    const authKey = crypto.randomBytes(16).toString('hex');
    await this.prisma.apiKey.create({
      data: {
        key: authKey,
        Application: { connect: { id: applicationId } },
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

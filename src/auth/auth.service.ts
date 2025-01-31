import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as crypto from 'node:crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async generateAuthKey(applicationId: string): Promise<string> {
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

  async generateJwt(user: { id: string; email: string }) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.prisma.token.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { access_token: token };
  }

  async validateUserByGoogle(googleId: string, email: string, name?: string) {
    let user = await this.prisma.user.findUnique({ where: { googleId } });

    if (!user) {
      user = await this.prisma.user.upsert({
        where: { email },
        update: { googleId },
        create: { email, googleId, name },
      });
    }

    return user;
  }
}

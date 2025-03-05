import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as crypto from 'node:crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async generateAuthKey(
    applicationId: string,
    keyName: string = 'Default Key',
  ): Promise<string> {
    const authKey = crypto.randomBytes(16).toString('hex');
    await this.prisma.apiKey.create({
      data: {
        key: authKey,
        name: keyName,
        enabled: true,
        application: { connect: { id: applicationId } },
      },
    });
    return authKey;
  }

  async validateAuthKey(authKey: string): Promise<boolean> {
    const key = await this.prisma.apiKey.findUnique({
      where: { key: authKey },
    });
    return !!key && key.enabled;
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

  async generateTokens(user: { id: string; email: string }) {
    const payload = { email: user.email, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async validateRefreshToken(refreshToken: string) {
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }

    const payload = this.jwtService.verify(refreshToken);
    await this.prisma.refreshToken.delete({ where: { token: refreshToken } });

    return this.generateTokens({ id: payload.sub, email: payload.email });
  }
}

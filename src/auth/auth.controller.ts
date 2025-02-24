import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    return { message: 'Redirecting to Google' };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: FastifyReply) {
    const { access_token, refresh_token } = req.user as {
      access_token: string;
      refresh_token: string;
    };

    res.setCookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const redirectUrl = `${this.configService.get<string>('CLIENT_URL')}/login/callback?token=${access_token}`;

    res.status(302).redirect(redirectUrl);
    return;
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return await this.authService.validateRefreshToken(refreshToken);
  }
}

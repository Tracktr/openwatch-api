import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authKey = request.headers['x-access-token'] as string;

    if (!authKey) {
      throw new UnauthorizedException('Auth key is missing');
    }

    const isValid = await this.authService.validateAuthKey(authKey);
    if (!isValid) {
      throw new UnauthorizedException('Invalid auth key');
    }

    return true;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async createApplication(
    name: string,
    user: { userId: string; email: string },
  ) {
    try {
      const application = await this.prisma.application.create({
        data: {
          name,
          user: { connect: { id: user.userId } },
        },
      });
      const apiKey = await this.authService.generateAuthKey(application.id);

      return {
        id: application.id,
        name: application.name,
        apiKey,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid application data');
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException('Unable to create application');
      }
      throw error;
    }
  }

  async getApplications(user: { userId: string; email: string }) {
    try {
      const applications = await this.prisma.application.findMany({
        where: {
          userId: user.userId,
        },
        include: {
          apiKey: true,
        },
      });

      return { applications };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid user data');
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException('No applications found');
      }
      throw error;
    }
  }

  async getApplicationById(id: string, user: any) {
    try {
      const application = await this.prisma.application.findFirst({
        where: { id: id, userId: user.id },
        include: {
          apiKey: true,
        },
      });

      if (!application) {
        throw new NotFoundException('Application not found');
      }

      return application;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid application ID');
      }
      throw error;
    }
  }

  async deleteApplication(id: string, user: any) {
    try {
      const application = await this.prisma.application.delete({
        where: { id: id, userId: user.id },
      });

      return application;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid application ID');
      }
      throw error;
    }
  }
}

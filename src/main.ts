import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import cookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  await app.getHttpAdapter().getInstance().register(cookie);

  const config = new DocumentBuilder()
    .setTitle('OpenWatch API')
    .setDescription('The OpenWatch API description')
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', name: 'x-access-token', in: 'header' },
      'x-access-token',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'Bearer',
    )
    .build();
  patchNestjsSwagger();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  // passport doesn't work nicely with fastify, so we need to add some hooks to make it work
  // github.com/nestjs/nest/issues/5702
  https: app
    .getHttpAdapter()
    .getInstance()
    .addHook('onRequest', (request, reply, done) => {
      reply.setHeader = function (key, value) {
        return this.raw.setHeader(key, value);
      };
      reply.end = function () {
        this.raw.end();
      };
      request.res = reply;
      done();
    });

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();

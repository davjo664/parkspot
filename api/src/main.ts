import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as path from 'path';
import {isDev} from './utils/migration-env';

const packageJson: { version: string } = require('./../package.json');

/**
 * In order to add ordinary express middlewares: */
function expressFactory() {
  const app = express();
  app.use(cookieParser());
  app.use('/static/', express.static(path.join(__dirname, 'static')));
  return app;
}

async function bootstrap() {

  const server = await NestFactory.create(AppModule, expressFactory(), {});

  const options = new DocumentBuilder()
    .setTitle('Parkspot API Documentation')
    .setSchemes(isDev() ? 'http' : 'https')
    .setBasePath(isDev() ? '/' : '/api')
    .setDescription('The (Germans) API Documentation for the parkspot project')
    .setVersion(packageJson.version)
    .addTag('parkspot')
    .addTag('input')
    .build();

  const document = SwaggerModule.createDocument(server, options);
  SwaggerModule.setup('/docs', server, document);

  await server.listen(3000);
}

bootstrap();

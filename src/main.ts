import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
const cookieParser = require('cookie-parser');
import { json } from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  // adding global validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // adding configuration
  // const configService : ConfigService = app.get(ConfigService)

  // setting cookie parser
  app.use(cookieParser());
  // data upload limit
  app.use(json({ limit: '100mb' }));

  // cors origin
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  const port = process.env.port || 8080;
  await app.listen(port);
}
bootstrap();

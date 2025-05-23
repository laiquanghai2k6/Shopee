import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptors } from './transform.interceptors';
import { configValidationSchema } from './schema.config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptors())
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }))
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials:true,

  })
  app.use('/stripe/webhook', bodyParser.raw({ type: 'application/json' }));

  // ⚠️ Then apply express.json() for everything else
  app.use((req, res, next) => {
    if (req.originalUrl === '/stripe/webhook') {
      next(); // skip default JSON parser
    } else {
      express.json()(req, res, next);
    }
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 5000);

}
bootstrap();

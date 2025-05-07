import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptors } from './transform.interceptors';
import { configValidationSchema } from './schema.config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptors())
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }))
  app.enableCors({
    origin:'http://localhost:3000',
    credentials:true,

  })
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 5000);

}
bootstrap();

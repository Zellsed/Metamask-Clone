import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://127.0.0.1:5500',
      'chrome-extension://mcfaondboloidobibkhedonmdednmfph',
    ],

    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
}
bootstrap();

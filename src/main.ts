import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import { AppModule } from './app.module';
import express from 'express';
import { NotFoundExceptionFilter } from './pages/notfound.exceptions';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('ejs');
  app.useGlobalFilters(new NotFoundExceptionFilter());

  await app.listen(3000);
}
bootstrap();

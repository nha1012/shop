import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import flash = require('connect-flash');

import { NotFoundExceptionFilter } from './pages/notfound.exceptions';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('ejs');
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.use(
    session({
      secret: 'Mã bảo mật',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import flash = require('connect-flash');
import { LoginFilter } from './common/exception/login.exception';

import { NotFoundExceptionFilter } from './pages/notfound.exceptions';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
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
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('ejs');
  app.useGlobalFilters(new NotFoundExceptionFilter());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();

import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  getComments(@Req() req, @Res() res, err) {
    res.render('index');
  }
}

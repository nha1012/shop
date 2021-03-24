import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private productService: ProductService) { }
  @Get()
  getComments(@Req() req, @Res() res, err) {
    this.productService.getProductTrending().then(value => {
      res.render('index', { productsTrending: value })
    })
  }
}

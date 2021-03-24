import { Body, Controller, Get, Param, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';


@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(public service: ProductService) { }

  @Get(':id')
  detailProduct(@Request() req, @Res() res, @Param() params) {
    console.log(req.user);

    this.service.getProductById(params.id).then(value => {
      res.render('product', { product: value })
    })
  }
}

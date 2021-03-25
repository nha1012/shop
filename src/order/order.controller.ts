import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { ProductService } from 'src/product/product.service';


@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    public service: OrderService,
    private productService: ProductService) { }

  @Post()
  async addToCart(@Request() req) {
    try {
      let productId: string;
      if (req.body.productId) {
        productId = req.body.productId
      }
      const product = await this.productService.getProductById(productId);
      const orderEntity = {
        productId: productId,
        status: false,
        qty: 1,
        tongTien: product.giaKhuyenMai
      }
      this.service.addToCart(orderEntity).then(value => value)
    } catch (error) {
      console.log(error);
    }
  }
}

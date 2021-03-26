import { Body, Controller, Delete, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { ProductService } from 'src/product/product.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
@UseGuards(AuthenticatedGuard)
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    public service: OrderService,
    private productService: ProductService) { }

  @Post()
  async addToCart(@Request() req, @Res() res) {
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
        tongTien: product.giaKhuyenMai,
        userId: req.user.userId
      }
      const order = await this.service.addToCart(orderEntity);
      if (order) {
        return res.status(200).send({ product: product, order: order });
      }
      return res.status(200).send({ product: null, order: null });
    } catch (error) {
      return res.status(500).send(error)
    }
  }
  @Delete()
  async deleteCartItem(@Request() req, @Res() res) {
    try {
      const { orderId } = req.body;
      const order = await this.service.findOne(orderId)
      const deleted = await this.service.deleteItemById(orderId)
      if (deleted) {
        return res.status(200).send({ order: order })
      }
      return res.status(204)
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}

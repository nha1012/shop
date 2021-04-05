import { Body, Controller, Delete, Get, Post, Put, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { ProductService } from 'src/product/product.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { MSG_ORDER } from 'src/messages/order';
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    public service: OrderService,
    private productService: ProductService) { }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async addToCart(@Request() req, @Res() res) {
    try {
      // data from client
      const { qty, productId } = req.body;
      // lấy ra product
      const product = await this.productService.getProductById(productId);
      if (product.soLuong <= 0 || product.soLuong < qty) {
        return res.status(200).send(MSG_ORDER.KDSL)
      }
      // tìm xem có order có status là fasle hay không
      const orderProduct = await this.service.findOrderByProductId(product.productId);
      // nếu có thì update không thì tạo mới
      if (orderProduct) {
        const orderUpdate = orderProduct;
        orderUpdate.qty = +qty + orderUpdate.qty
        orderUpdate.tongTien = orderUpdate.qty * orderUpdate.tongTien;
        await this.service.updateOrderByProductId(orderUpdate)
        await this.productService.updateSoLuongSanPham(product.productId, product.soLuong - qty)
        return res.status(200).send({ product: product, order: orderUpdate });
      } else {
        const orderEntity = {
          productId: productId,
          status: false,
          qty: +qty,
          tongTien: product.giaKhuyenMai * +qty,
          userId: req.user.userId
        }
        const order = await this.service.addToCart(orderEntity);
        this.productService.updateSoLuongSanPham(product.productId, product.soLuong - qty)
        if (order) {
          return res.status(200).send({ product: product, order: order });
        }
      }
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  @Put()
  async updateCartItem(@Request() req, @Res() res) {
    try {
      // data from client
      const { qty, productId } = req.body;
      // lấy ra product
      const product = await this.productService.getProductById(productId);
      if (product.soLuong <= 0 || product.soLuong < qty) {
        return res.status(200).send(MSG_ORDER.KDSL)
      }
      // tìm xem có order có status là fasle hay không
      const orderProduct = await this.service.findOrderByProductId(product.productId);
      // nếu có thì update không thì tạo mới
      const orderUpdate = orderProduct;
      orderUpdate.qty = +qty
      orderUpdate.tongTien = product.giaKhuyenMai * orderUpdate.qty;
      await this.service.updateOrderByProductId(orderUpdate)
      await this.productService.updateSoLuongSanPham(product.productId, product.soLuong - qty)
      return res.status(200).send({ product: product, order: orderUpdate });

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

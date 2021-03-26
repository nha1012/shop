import { Controller, Get, Param, Render, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { DmSanPhamService } from './dm-san-pham/dm-san-pham.service';
import { OrderEntity } from './order/order.entity';
import { OrderService } from './order/order.service';
import { ProductService } from './product/product.service';

@Controller()
export class AppController {
  private carts = [];
  private badge: number;
  private tongTien: number;
  constructor(
    private readonly appService: AppService,
    private productService: ProductService,
    private danhMucSanPham: DmSanPhamService,
    private orderService: OrderService,
  ) { }

  @Get()
  @Render('index')
  async getComments(@Request() req) {
    const products = await this.productService.getProductTrending();
    const danhMucSanPhams = await this.danhMucSanPham.getAllDanhMuc();
    let orders: OrderEntity[] = [];
    if (req.user) {
      orders = await this.orderService.getCarts(req.user.userId);
    }
    this.carts = orders;
    let tongTien = 0;
    orders.forEach(value => {
      tongTien += value.tongTien || 0
    })
    const badge = orders.length;
    this.tongTien = tongTien;
    this.badge = badge;
    if (products && danhMucSanPhams) {
      return { productsTrending: products, danhMucSanPhams, carts: orders, tongTien: tongTien, badge: badge }
    } else {
      return { productsTrending: [], danhMucSanPhams: [], carts: orders, tongTien: tongTien, badge: badge }
    }
  }


  @Get('product/:id')
  detailProduct(@Request() req, @Res() res, @Param() params) {
    this.productService.getProductById(params.id).then(value => {
      res.render('product', { product: value, carts: this.carts, tongTien: this.tongTien, badge: this.badge })
    })
  }

  @UseGuards(AuthenticatedGuard)
  @Get('cart')
  @Render('cart')
  getCarts(@Req() req, @Res() res, err) {
  }

  @UseGuards(AuthenticatedGuard)
  @Get('checkout')
  @Render('checkout')
  getCheckout(@Req() req, @Res() res, err) {
  }

  @Get('contact')
  @Render('contact')
  getContact(@Req() req, @Res() res, err) {
  }
  @Get('about')
  @Render('about')
  getAbout(@Req() req, @Res() res, err) {
  }
  @Get('subcategory')
  @Render('subcategory')
  getSubcategory(@Req() req, @Res() res, err) {
  }

  @Get('auth')
  @Render('auth')
  getAuth(@Req() req, @Res() res, err) {
  }
}

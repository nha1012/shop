import { Controller, Get, Global, Param, Render, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { DmSanPhamService } from './dm-san-pham/dm-san-pham.service';
import { OrderEntity } from './order/order.entity';
import { OrderService } from './order/order.service';
import { ProductService } from './product/product.service';
@Controller()
export class AppController {

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
    let tongTien = 0;
    orders.forEach(value => {
      tongTien += value.tongTien || 0
    })
    const badge = orders.length;
    if (products && danhMucSanPhams) {
      return { productsTrending: products, danhMucSanPhams, carts: orders, tongTien: tongTien, badge: badge }
    } else {
      return { productsTrending: [], danhMucSanPhams: [], carts: orders, tongTien: tongTien, badge: badge }
    }
  }


  @Get('product/:id')
  async detailProduct(@Request() req, @Res() res, @Param() params) {
    let orders: OrderEntity[] = [];
    if (req.user) {
      orders = await this.orderService.getCarts(req.user.userId);
    }
    let tongTien = 0;
    orders.forEach(value => {
      tongTien += value.tongTien || 0
    })
    const badge = orders.length;

    this.productService.getProductById(params.id).then(async value => {
      value.danhMucSanPhamId
      const sanPhamTuongTus = await this.productService.getSanPhamTuongTu(value.danhMucSanPhamId, value.productId);      
      res.render('product', { product: value, sanPhamTuongTus: sanPhamTuongTus, carts: orders, tongTien: tongTien, badge: badge })
    })
  }

  @UseGuards(AuthenticatedGuard)
  @Get('cart')
  @Render('cart')
  async getCarts(@Req() req, @Res() res, err) {
    const { userId } = req.user
    if (!userId) {
      return res.redirect('./auth/login')
    }
    let orders: OrderEntity[] = [];
    if (userId) {
      orders = await this.orderService.getCarts(userId);
    }
    let tongTien = 0;
    orders.forEach(value => {
      tongTien += value.tongTien || 0
    })
    const badge = orders.length;
    return { carts: orders, tongTien: tongTien, badge: badge }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('checkout')
  @Render('checkout')
  async checkout(@Req() req, @Res() res, err) {
    const { userId } = req.user
    if (!userId) {
      return res.redirect('./auth/login')
    }
    let orders: OrderEntity[] = [];
    if (userId) {
      orders = await this.orderService.getCarts(userId);
    }
    let tongTien = 0;
    orders.forEach(value => {
      tongTien += value.tongTien || 0
    })
    const badge = orders.length;
    return { carts: orders, tongTien: tongTien, badge: badge }
  }

  @Get('contact')
  @Render('contact')
  async getContact(@Req() req, @Res() res) {
    let orders: OrderEntity[] = [];
    if (req.user) {
      orders = await this.orderService.getCarts(req.user.userId);
    }
    let tongTien = 0;
    orders.forEach(value => {
      tongTien += value.tongTien || 0
    })
    const badge = orders.length;
      return { carts: orders, tongTien: tongTien, badge: badge }
  }

  @Get('about')
  @Render('about')
  async getAbout(@Req() req, @Res() res) {
    let orders: OrderEntity[] = [];
    if (req.user) {
      orders = await this.orderService.getCarts(req.user.userId);
    }
    
    let tongTien = 0;
    orders.forEach(value => {
      tongTien += value.tongTien || 0
    })
    const badge = orders.length;
      return { carts: orders, tongTien: tongTien, badge: badge }
  }
  @Get('subcategory')
  @Render('subcategory')
  async getSubcategory(@Req() req, @Res() res) {
    const products = await this.productService.getProductTrending();
    const danhMucSanPhams = await this.danhMucSanPham.getAllDanhMuc();
    let orders: OrderEntity[] = [];
    if (req.user) {
      orders = await this.orderService.getCarts(req.user.userId);
    }
    let tongTien = 0;
    orders.forEach(value => {
      tongTien += value.tongTien || 0
    })
    const badge = orders.length;

    if (products && danhMucSanPhams) {
      return { productsTrending: products, danhMucSanPhams, carts: orders, tongTien: tongTien, badge: badge }
    } else {
      return { productsTrending: [], danhMucSanPhams: [], carts: orders, tongTien: tongTien, badge: badge }
    }
  }

  @Get('auth')
  @Render('auth')
  getAuth(@Req() req, @Res() res, err) {
  }

  @Get('auth/register')
  @Render('register')
  getRegister(@Req() req, @Res() res, err) {
  }
}

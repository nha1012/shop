import { Controller, Get, Render, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { DmSanPhamService } from './dm-san-pham/dm-san-pham.service';
import { ProductService } from './product/product.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private productService: ProductService,
    private danhMucSanPham: DmSanPhamService) { }
  @Get()
  @Render('index')
  async getComments(@Request() req) {
    console.log(req.user);
    const products = await this.productService.getProductTrending();
    const danhMucSanPhams = await this.danhMucSanPham.getAllDanhMuc();
    if (products && danhMucSanPhams) {
      return { productsTrending: products, danhMucSanPhams }
    } else {
      return { productsTrending: [], danhMucSanPhams: [] }
    }
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

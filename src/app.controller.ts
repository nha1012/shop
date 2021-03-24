import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
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
  async getComments(@Req() req, @Res() res, err) {
    const products = await this.productService.getProductTrending();
    const danhMucSanPhams = await this.danhMucSanPham.getAllDanhMuc();
    if (products && danhMucSanPhams) {
      return { productsTrending: products, danhMucSanPhams }
    } else {
      return { productsTrending: [], danhMucSanPhams: [] }
    }
  }
  @Get('cart')
  @Render('cart')
  getCarts(@Req() req, @Res() res, err) {
  }

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
}

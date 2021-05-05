import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { ReviewSanPhamService } from './review-san-pham.service';
import { ReviewSanPhamEntity } from './review-san-pham.entity';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';

@ApiTags('Review sản phẩm')
@Controller('review-san-pham')
export class ReviewSanPhamController {
  constructor(public service: ReviewSanPhamService) { }
  @UseGuards(AuthenticatedGuard)
  @Post()
  async reviewSanpham(@Request() req, @Res() res){
    const { userId } = req.user
    let { danhGia, productId, soSao } = req.body
    soSao = + soSao;
    const review = {
      danhGia,
      productId,
      userId,
      soSao
    }
    console.log(review);
    const created = await this.service.addReview(review) 
    if (created) {
      return res.status(200).send(created)
    }    
      return res.status(500)
  }
}

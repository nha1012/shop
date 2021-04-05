import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChuongTrinhKhuyenMaiService } from './chuong-trinh-khuyen-mai.service';

@ApiTags('Chương trình khuyến mãi')
@Controller('chuong-trinh-khuyen-mai')
export class ChuongTrinhKhuyenMaiController {
  constructor(public service: ChuongTrinhKhuyenMaiService) { }
}

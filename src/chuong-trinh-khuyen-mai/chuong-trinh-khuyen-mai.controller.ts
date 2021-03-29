import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { ChuongTrinhKhuyenMaiService } from './chuong-trinh-khuyen-mai.service';
import { ChuongTrinhKhuyenMaiEntity } from './chuong-trinh-khuyen-mai.entity';

@ApiTags('Chương trình khuyến mãi')
@Controller('chuong-trinh-khuyen-mai')
export class ChuongTrinhKhuyenMaiController {
  constructor(public service: ChuongTrinhKhuyenMaiService) { }
}

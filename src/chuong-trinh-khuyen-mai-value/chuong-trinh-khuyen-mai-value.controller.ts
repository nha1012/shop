import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { ChuongTrinhKhuyenMaiValueService } from './chuong-trinh-khuyen-mai-value.service';
import { ChuongTrinhKhuyenMaiValueEntity } from './chuong-trinh-khuyen-mai-value.entity';

@ApiTags('Chương trình khuyến mãi')
@Controller('chuong-trinh-khuyen-mai-value')
export class ChuongTrinhKhuyenMaiValueController {
  constructor(public service: ChuongTrinhKhuyenMaiValueService) { }
}

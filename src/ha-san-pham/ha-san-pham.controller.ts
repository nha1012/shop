import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HaSanPhamService } from './ha-san-pham.service';
import { HaSanPhamEntity } from './ha-san-pham.entity';
import * as Cloudinary from 'cloudinary';

@ApiTags('Hinh anh sản phẩm')
@Controller('Ha-san-pham')
export class HaSanPhamController {
  constructor(public service: HaSanPhamService) { }
}

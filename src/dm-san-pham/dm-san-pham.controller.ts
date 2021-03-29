import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DmSanPhamService } from './dm-san-pham.service';
import { DmSanPhamEntity } from './dm-san-pham.entity';

@ApiTags('Danh mục sản phẩm')
@Controller('danh-muc-san-pham')
export class DmSanPhamController {
  constructor(public service: DmSanPhamService) { }
}

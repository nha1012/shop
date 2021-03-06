import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NhaCungCapEntity } from './nha-cung-cap.entity';
import { NhaCungCapService } from './nha-cung-cap.service';

@ApiBearerAuth('token')
@ApiTags('Nhà cung cấp')
@Controller('nha-cung-cap')
export class NhaCungCapController {
  constructor(public service: NhaCungCapService) { }
}

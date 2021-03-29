import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
@ApiBearerAuth('token')
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(public service: RoleService) { }
}

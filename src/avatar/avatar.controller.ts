import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AvatarService } from './avatar.service';
import { AvatarEntity } from './avatar.entity';

@ApiTags('Avatar')
@Controller('avatar')
export class AvatarController {
  constructor(public service: AvatarService) { }
}

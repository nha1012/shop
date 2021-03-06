import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WorkshiftEntity } from './workshift.entity';
import { WorkshiftService } from './workshift.service';

@Crud({
  model: { type: WorkshiftEntity },
  params: {
    id: {
      field: 'workshiftId',
      primary: true,
      type: 'uuid',
    },
  },
  query: {
    join: {
      user: {},
    },
  },
})
@ApiBearerAuth('token')
@ApiTags('Workshift')
@Controller('workshift')
export class WorkshiftController {
  constructor(public service: WorkshiftService) { }
}

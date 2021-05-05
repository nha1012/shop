import { Controller } from '@nestjs/common';
import { AttributeValueService } from './attribute-value.service';
@Controller('attribute-value')
export class AttributeValueController {
  constructor(public service: AttributeValueService) { }
}

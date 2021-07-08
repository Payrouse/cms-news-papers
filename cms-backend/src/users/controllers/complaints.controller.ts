import { ComplaintsService } from './../services/complaints.service';
import { Controller, Get } from '@nestjs/common';

@Controller('complaints')
export class ComplaintsController {
  constructor(private ComplaintsService: ComplaintsService) {}

  @Get()
  getJournalists() {
    return this.ComplaintsService.findAll();
  }
}

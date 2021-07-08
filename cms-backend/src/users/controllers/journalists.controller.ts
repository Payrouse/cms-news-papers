import { JournalistsService } from './../services/journalists.service';
import { Controller, Get } from '@nestjs/common';

@Controller('journalists')
export class JournalistsController {
  constructor(private journalistService: JournalistsService) {}

  @Get()
  getJournalists() {
    return this.journalistService.findAll();
  }
}

import { Controller, Get } from '@nestjs/common';

import { StreamingsService } from './../services/streamings.service';

@Controller('streamings')
export class StreamingsController {
  constructor(private streamService: StreamingsService) {}

  @Get()
  getStreamings() {
    return this.streamService.findAll();
  }
}

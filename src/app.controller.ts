import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { BitlyFilterService } from './bitlyFilter/bitly-filter.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly bitlyFilterService: BitlyFilterService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('filter-bitly')
  filterBitly(@Query('text') text: string): string[] {
    return this.bitlyFilterService.filter(text);
  }
}

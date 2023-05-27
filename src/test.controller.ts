import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from './common/guards/access.guard';

@Controller()
export class TestController {
  @Get()
  @UseGuards(JwtAccessGuard)
  test() {
    return 'test';
  }
}

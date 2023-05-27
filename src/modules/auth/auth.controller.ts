import { Controller, Get, HostParam, Post } from '@nestjs/common';
import { Tenant } from 'src/common/decorators/tenant.decorator';

@Controller({ path: 'auth' })
export class AuthController {
  @Post()
  async signIn() {
    return 'test';
  }

  @Get('signin')
  async _signIn(@Tenant() d: any) {
    return d;
  }
}

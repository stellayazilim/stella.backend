import { Controller, Get, Post } from '@nestjs/common';

@Controller({ host: 'administrator.localhost', path: 'auth' })
export class AuthController {
  @Post('signin')
  async signIn() {
    return 'test';
  }
}

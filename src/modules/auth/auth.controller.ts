import {
  Controller,
  Get,
  Injectable,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
class TestGuard extends AuthGuard('Local') {}

@Controller({ path: 'auth' })
export class AuthController {
  @Get('signin')
  @UseGuards(TestGuard)
  async signIn(@Req() req: Request) {
    return req.user;
  }
}

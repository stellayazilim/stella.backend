import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { User } from 'src/common/decorators/user.decorator';
import { RefreshGuard } from './guards/refresh.guard';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  @UseGuards(LocalGuard)
  async signIn(@Req() req: Request) {
    const { _id, email, role } = req.user;

    return this.authService.SignTokens({
      _id,
      email,
      role,
    });
  }

  @Get('refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Req() req: Request) {
    return this.authService.RefreshTokens(req.user);
  }
}

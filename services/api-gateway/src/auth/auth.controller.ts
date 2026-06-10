import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthProxyService } from './auth-proxy.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authProxyService: AuthProxyService) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.authProxyService.register(body);
  }

  @Post('login')
  async login(@Body() body: any) {
    return this.authProxyService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req: any) {
    return { user: req.user };
  }
}

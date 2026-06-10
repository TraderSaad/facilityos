import { Body, Controller, Get, Request, UseGuards, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserProfileDto } from '../user/dto/user-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req: { user: UserProfileDto }) {
    return { user: req.user };
  }
}

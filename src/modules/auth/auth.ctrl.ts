import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('signup')
  async signup() {
    return 'signup';
  }

  @Post('login')
  async login() {
    return 'login';
  }

  @Get('me')
  async whoAmI() {
    return 'whoAmI';
  }
}

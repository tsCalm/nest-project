import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signup(@Body() createUser: CreateUser) {
    return this.authService.signUp(createUser);
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

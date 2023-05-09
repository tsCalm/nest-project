import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from '../user/dto/create-user.dto';
import { CreateUserParam } from '../user/dto/create-user-param';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signup(@Body() createUser: CreateUser) {
    return this.authService.signUp(new CreateUserParam(createUser));
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

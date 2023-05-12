import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateUserParam } from '../user/dto/create-user-param';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.entity';
import { CurrentUser } from './decorator/user';
import { JwtAuthGuard } from './guard/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signup(@Body() createUser: CreateUserDto) {
    return this.authService.signUp(new CreateUserParam(createUser));
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }
}

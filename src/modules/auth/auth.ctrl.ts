import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserParam } from '../user/dto/create-user-param';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LOGIN_TYPE } from '../user/enum';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/user';
import { LoginDto } from './dto/login.dto';
import { GENERATE_JWT_TYPE } from './enum';
import { AccessTokenGuard } from './guard/access-token.guard';
import { GoogleAuthGuard } from './guard/google.strategy.guard';
import { KakaoAuthGuard } from './guard/kakao.guard';
import { NaverAuthGuard } from './guard/naver.guard';
import { RefreshTokenGuard } from './guard/refresh-token.guard';

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
  @UseGuards(AccessTokenGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async generateAccessToken(@CurrentUser() user: User) {
    const { id, email } = user;
    const accessToken = await this.authService.generateToken(
      id,
      email,
      GENERATE_JWT_TYPE.ACCESS,
    );
    return { accessToken };
  }

  @Get('naver')
  @UseGuards(NaverAuthGuard)
  async naverLogin() {}

  @Get('naver/callback')
  @UseGuards(NaverAuthGuard)
  async naverCallBack(
    @Req() req: Request & { user?: User },
    @Res() res: Response,
  ) {
    try {
      const { user } = req;
      this.authService.checkLoginType(user, LOGIN_TYPE.NAVER);
      const tokens = await this.authService.login(user, true);
      return res.send(tokens);
    } catch (err) {
      res.send(err);
    }
  }

  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {}

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoCallBack(
    @Req() req: Request & { user?: User },
    @Res() res: Response,
  ) {
    try {
      const { user } = req;
      this.authService.checkLoginType(user, LOGIN_TYPE.KAKAO);
      const tokens = await this.authService.login(user, true);
      return res.send(tokens);
    } catch (err) {
      res.send(err);
    }
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallBack(
    @Req() req: Request & { user?: User },
    @Res() res: Response,
  ) {
    try {
      const { user } = req;
      this.authService.checkLoginType(user, LOGIN_TYPE.GOOGLE);
      const tokens = await this.authService.login(user, true);
      return res.send(tokens);
    } catch (err) {
      res.send(err);
    }
  }
}

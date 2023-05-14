import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from '../common/hash/hash.service';
import { HASH_PASSWORD_SERVICE_TOKEN } from '../common/hash/hash.token';
import { UserExistRepository } from '../user/repository/user-exist';
import {
  USER_CREATE_REPOSITORY_TOKEN,
  USER_EXIST_REPOSITORY_TOKEN,
  USER_FIND_REPOSITORY_TOKEN,
} from '../user/token';
import {
  AUTH_LOGIN_SERVICE_TOKEN,
  AUTH_SIGNUP_SERVICE_TOKEN,
  JWT_TOKEN_REPOSITORY_TOKEN,
} from './token';
import { User } from '../user/user.entity';
import { AuthController } from './auth.ctrl';
import { AuthService } from './auth.service';
import { SignUpService } from './service/sign-up.service';
import { UserCreateRepository } from '../user/repository/user-create';
import { UserFindRepository } from '../user/repository/user-find';
import { LoginService } from './service/login.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtToken } from './jwt-token.entity';
import { JwtTokenRepository } from './repository/jwt-token';
import { LocalStrategy } from './strategy/local.strategy';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { NaverStrategy } from './strategy/naver.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User, JwtToken])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
    NaverStrategy,
    KakaoStrategy,
    {
      provide: HASH_PASSWORD_SERVICE_TOKEN,
      useClass: HashService,
    },
    {
      provide: USER_EXIST_REPOSITORY_TOKEN,
      useClass: UserExistRepository,
    },
    {
      provide: USER_CREATE_REPOSITORY_TOKEN,
      useClass: UserCreateRepository,
    },
    {
      provide: USER_FIND_REPOSITORY_TOKEN,
      useClass: UserFindRepository,
    },
    {
      provide: JWT_TOKEN_REPOSITORY_TOKEN,
      useClass: JwtTokenRepository,
    },
    {
      provide: AUTH_SIGNUP_SERVICE_TOKEN,
      useClass: SignUpService,
    },
    {
      provide: AUTH_LOGIN_SERVICE_TOKEN,
      useClass: LoginService,
    },
  ],
})
export class AuthModule {}

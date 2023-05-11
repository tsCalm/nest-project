import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from '../common/hash/hash.service';
import { HASH_PASSWORD_SERVICE_TOKEN } from '../common/hash/hash.token';
import { UserExistRepository } from '../user/repository/user-exist';
import {
  USER_CREATE_REPOSITORY_TOKEN,
  USER_EXIST_REPOSITORY_TOKEN,
} from '../user/token';
import { AUTH_SIGNUP_SERVICE_TOKEN } from './token';
import { User } from '../user/user.entity';
import { AuthController } from './auth.ctrl';
import { AuthService } from './auth.service';
import { SignUpService } from './service/sign-up.service';
import { UserCreateRepository } from '../user/repository/user-create';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
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
      provide: AUTH_SIGNUP_SERVICE_TOKEN,
      useClass: SignUpService,
    },
  ],
})
export class AuthModule {}

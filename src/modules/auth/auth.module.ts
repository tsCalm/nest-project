import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from '../common/hash/hash-password.service';
import { HASH_PASSWORD_TOKEN } from '../common/hash/hash.token';
import { UserExistRepository } from '../user/repository/user-exist';
import {
  USER_CREATE_REPOSITORY_TOKEN,
  USER_EXIST_REPOSITORY_TOKEN,
} from '../user/token';
import { User } from '../user/user.entity';
import { AuthController } from './auth.ctrl';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HASH_PASSWORD_TOKEN,
      useClass: HashService,
    },
    {
      provide: USER_EXIST_REPOSITORY_TOKEN,
      useClass: UserExistRepository,
    },
    {
      provide: USER_CREATE_REPOSITORY_TOKEN,
      useClass: UserExistRepository,
    },
  ],
})
export class AuthModule {}

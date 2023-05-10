import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from '../common/hash-password.service';
import { UserCreateRepository } from '../user/repository/user-create';
import { UserExistRepository } from '../user/repository/user-exist';
import { UserRepository } from '../user/repository/user-repo';
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
    HashService,
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

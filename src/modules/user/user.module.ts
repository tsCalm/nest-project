import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreateRepository } from './repository/user-create';
import { UserExistRepository } from './repository/user-exist';
import { UserRepository } from './repository/user-repo';
import {
  USER_CREATE_REPOSITORY_TOKEN,
  USER_EXIST_REPOSITORY_TOKEN,
} from './token';
import { UserController } from './user.ctrl';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: USER_EXIST_REPOSITORY_TOKEN,
      useClass: UserExistRepository,
    },
    {
      provide: USER_CREATE_REPOSITORY_TOKEN,
      useClass: UserCreateRepository,
    },
  ],
  exports: [
    {
      provide: USER_EXIST_REPOSITORY_TOKEN,
      useClass: UserExistRepository,
    },
    {
      provide: USER_CREATE_REPOSITORY_TOKEN,
      useClass: UserCreateRepository,
    },
  ],
})
export class UserModule {}

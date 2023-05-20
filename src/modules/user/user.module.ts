import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3ManagerService } from '../common/aws/s3/s3-manager.service';
import { UserCreateRepository } from './repository/user-create';
import { UserExistRepository } from './repository/user-exist';
import { UserFindRepository } from './repository/user-find';
import { UserRepository } from './repository/user-repo';
import {
  USER_CREATE_REPOSITORY_TOKEN,
  USER_EXIST_REPOSITORY_TOKEN,
  USER_FIND_REPOSITORY_TOKEN,
} from './token';
import { UserController } from './user.ctrl';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    S3ManagerService,
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
    {
      provide: USER_FIND_REPOSITORY_TOKEN,
      useClass: UserFindRepository,
    },
  ],
})
export class UserModule {}

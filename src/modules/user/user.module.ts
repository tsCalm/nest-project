import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3ManagerService } from '../common/aws/s3/service/s3-manager.service';
import { AWS_S3_MANAGER_SERVICE } from '../common/aws/s3/token';
import { UserCreateRepository } from './repository/user-create';
import { UserExistRepository } from './repository/user-exist';
import { UserFindRepository } from './repository/user-find';
import { UserRepository } from './repository/user-repo';
import { UserService } from './service/user.service';
import {
  USER_CREATE_REPOSITORY_TOKEN,
  USER_EXIST_REPOSITORY_TOKEN,
  USER_FIND_REPOSITORY_TOKEN,
  USER_SERVICE_TOKEN,
} from './token';
import { UserController } from './user.ctrl';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: AWS_S3_MANAGER_SERVICE,
      useClass: S3ManagerService,
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
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
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

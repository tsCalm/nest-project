import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreateRepository } from './repository/user.create';
import { UserExistRepository } from './repository/user.exist';
import { UserRepository } from './repository/user.repo';
import { UserController } from './user.ctrl';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserExistRepository, UserCreateRepository],
  exports: [UserExistRepository, UserCreateRepository],
})
export class UserModule {}

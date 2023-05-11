import { Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { IUserFindRepository } from '../types/repository/user-find.interface';
import { User } from '../user.entity';
import { UserRepository } from './user-repo';

@Injectable()
export class UserFindRepository
  extends UserRepository
  implements IUserFindRepository
{
  async findOne(options: FindOneOptions<User>): Promise<User> {
    return this._userRepo.findOne(options);
  }
}

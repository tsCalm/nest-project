import { Injectable } from '@nestjs/common';
import { IUserCreateRepository } from '../types/repository/user-create.interface';
import { User } from '../user.entity';
import { UserRepository } from './user-repo';

@Injectable()
export class UserCreateRepository
  extends UserRepository
  implements IUserCreateRepository
{
  async save(params: User): Promise<User> {
    return await this._userRepo.save(params);
  }
}

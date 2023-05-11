import { Injectable } from '@nestjs/common';
import { IUserExistRepository } from '../types/repository/user-exist.interface';
import { User } from '../user.entity';
import { UserRepository } from './user-repo';

@Injectable()
export class UserExistRepository
  extends UserRepository
  implements IUserExistRepository
{
  // constructor() {
  //   super();
  // }

  async isExistUser(key: keyof User, value: string) {
    return this._userRepo.exist({
      where: {
        [key]: value,
      },
    });
  }
}

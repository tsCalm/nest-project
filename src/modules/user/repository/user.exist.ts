import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UserRepository } from './user.repo';

@Injectable()
export class UserExistRepository extends UserRepository {
  // constructor() {
  //   super();
  // }

  async isExistUser(key: keyof User, value: string) {
    return await this._userRepo.exist({
      where: {
        [key]: value,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UserRepository } from './user.repo';

@Injectable()
export class UserCreateRepository extends UserRepository {
  // constructor() {
  //   super();
  // }

  async save(params: User) {
    return this._userRepo.save(params);
  }
}

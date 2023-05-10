import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

// @Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    protected readonly _userRepo: Repository<User>,
  ) {}

  getInstance(params: Partial<User>) {
    return this._userRepo.create(params);
  }

  // getInstance(params: Partial<User>) {
  //   return this._userRepo.create(params);
  // }

  // async isExistUser(key: keyof User, value: string) {
  //   return await this._userRepo.exist({
  //     where: {
  //       [key]: value,
  //     },
  //   });
  // }

  // async findByEmail(email: string): Promise<Partial<User>> {
  //   return {};
  // }

  // async findByTel(tel: string): Promise<Partial<User>> {
  //   return {};
  // }
}

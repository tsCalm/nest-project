import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { UserRepository } from './user-repo';

@Injectable()
export class UserFindRepository extends UserRepository {
  async findByEmail(email: string): Promise<Partial<User>> {
    return {};
  }

  async findByTel(tel: string): Promise<Partial<User>> {
    return {};
  }
}

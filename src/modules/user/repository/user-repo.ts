import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../types/repository';
import { User } from '../user.entity';

// @Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    protected readonly _userRepo: Repository<User>,
  ) {}

  getInstance(params: Partial<User>) {
    return this._userRepo.create(params);
  }
}

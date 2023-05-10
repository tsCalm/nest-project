import { IUserRepository } from '.';
import { User } from '../../user.entity';

export interface IUserCreateRepository extends IUserRepository {
  save(params: User): Promise<User>;
}

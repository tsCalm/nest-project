import { IUserRepository } from '.';
import { User } from '../../user.entity';

export interface IUserExistRepository extends IUserRepository {
  isExistUser(key: keyof User, value: string): Promise<boolean>;
}

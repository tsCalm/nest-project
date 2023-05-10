import { User } from '../../user.entity';

export interface IUserRepository {
  getInstance(params: Partial<User>): User;
}

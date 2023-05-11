import { FindOneOptions } from 'typeorm';
import { IUserRepository } from '.';
import { User } from '../../user.entity';

export interface IUserFindRepository extends IUserRepository {
  findOne(options: FindOneOptions<User>): Promise<User>;
}

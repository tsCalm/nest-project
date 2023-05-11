import { ICreateUserParam } from 'src/modules/user/types/dto/create-user.type';
import { User } from '../../../user/user.entity';

export interface ISignUpService {
  checkUniqueColumns(email: string, tel: string): Promise<void>;
  getNewUserParam(createUserParams: ICreateUserParam): Promise<User>;
}

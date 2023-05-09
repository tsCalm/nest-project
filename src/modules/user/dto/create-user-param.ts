import { ICreateUserParam } from '../types/create-user.type';
import { CreateUser } from './create-user.dto';

export class CreateUserParam implements ICreateUserParam {
  email: string;
  address: string = '';
  password: string = '';
  name: string;
  birth: string;
  tel: string;
  constructor(createUser: CreateUser) {
    const { address_main = '', address_sub = '' } = createUser;
    this.email = createUser.email;
    this.password = createUser.password;
    this.name = createUser.name;
    this.birth = createUser.birth;
    this.tel = createUser.tel;
    this.address = address_main;
    if (address_sub) this.address += ` ${address_sub}`;
  }
}

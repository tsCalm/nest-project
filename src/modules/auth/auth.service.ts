import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { HashService } from '../common/hash-password.service';
import { CreateUser } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly _hashService: HashService) {}

  async signUp(createUser: CreateUser) {
    const { password } = createUser;
    const hashPassword = await this._hashService.hashPassword(password);
    createUser.password = hashPassword;
    return createUser;
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { HashService } from '../common/hash-password.service';
import { UserRepository } from '../user/repository/user.repo';
import { CreateUser } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _hashService: HashService,
    private readonly _userRepository: UserRepository,
  ) {}

  async signUp(createUser: CreateUser) {
    try {
      const { email, tel, password } = createUser;

      const isExistEmail = await this._userRepository.isExistUser(
        'email',
        email,
      );
      if (isExistEmail) throw new Error('이미 존재하는 이메일입니다.');

      const isExistTel = await this._userRepository.isExistUser('tel', tel);
      if (isExistTel) throw new Error('이미 존재하는 전화번호입니다.');

      const hashPassword = await this._hashService.hashPassword(password);
      createUser.password = hashPassword;
      return createUser;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

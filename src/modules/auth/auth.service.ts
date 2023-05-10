import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { HashService } from '../common/hash-password.service';
import { UserRepository } from '../user/repository/user.repo';
import { CreateUser } from '../user/dto/create-user.dto';
import { ICreateUserParam } from '../user/types/create-user.type';
import { UserExistRepository } from '../user/repository/user.exist';
import { UserCreateRepository } from '../user/repository/user.create';

@Injectable()
export class AuthService {
  constructor(
    private readonly _hashService: HashService,
    private readonly _userExistRepository: UserExistRepository,
    private readonly _userCreateRepository: UserCreateRepository,
  ) {}

  async signUp(createUserParams: ICreateUserParam) {
    try {
      const { email, tel, password } = createUserParams;

      const isExistEmail = await this._userExistRepository.isExistUser(
        'email',
        email,
      );
      if (isExistEmail) throw new Error('이미 존재하는 이메일입니다.');

      const isExistTel = await this._userExistRepository.isExistUser(
        'tel',
        tel,
      );
      if (isExistTel) throw new Error('이미 존재하는 전화번호입니다.');

      const hashPassword = await this._hashService.hashPassword(password);
      createUserParams.password = hashPassword;
      const newUserParams =
        this._userExistRepository.getInstance(createUserParams);
      return await this._userCreateRepository.save(newUserParams);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

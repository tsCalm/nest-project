import { Inject, Injectable } from '@nestjs/common';
import { HashService } from 'src/modules/common/hash/hash.service';
import { IHashService } from 'src/modules/common/hash/hash.interface';
import { HASH_PASSWORD_SERVICE_TOKEN } from 'src/modules/common/hash/hash.token';
import { USER_EXIST_REPOSITORY_TOKEN } from 'src/modules/user/token';
import { ICreateUserParam } from 'src/modules/user/types/dto/create-user.type';
import { IUserExistRepository } from 'src/modules/user/types/repository/user-exist.interface';
import { ISignUpService } from '../types/service';

@Injectable()
export class SignUpService implements ISignUpService {
  constructor(
    @Inject(HASH_PASSWORD_SERVICE_TOKEN)
    private readonly _hashService: IHashService,
    @Inject(USER_EXIST_REPOSITORY_TOKEN)
    private readonly _userExistRepository: IUserExistRepository,
  ) {}

  async checkUniqueColumns(email: string, tel: string) {
    const isExistEmail = await this._userExistRepository.isExistUser(
      'email',
      email,
    );
    if (isExistEmail) throw new Error('이미 존재하는 이메일입니다.');

    const isExistTel = await this._userExistRepository.isExistUser('tel', tel);
    if (isExistTel) throw new Error('이미 존재하는 전화번호입니다.');
  }

  async getNewUserParam(createUserParams: ICreateUserParam) {
    const { password } = createUserParams;
    const hashPassword = await this._hashService.hashPassword(password);
    createUserParams.password = hashPassword;
    return this._userExistRepository.getInstance(createUserParams);
  }
}

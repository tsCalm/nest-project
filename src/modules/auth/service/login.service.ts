import { Inject, Injectable } from '@nestjs/common';
import { HashService } from 'src/modules/common/hash/hash.service';
import { IHashService } from 'src/modules/common/hash/hash.interface';
import { HASH_PASSWORD_SERVICE_TOKEN } from 'src/modules/common/hash/hash.token';
import {
  USER_EXIST_REPOSITORY_TOKEN,
  USER_FIND_REPOSITORY_TOKEN,
} from 'src/modules/user/token';
import { ICreateUserParam } from 'src/modules/user/types/dto/create-user.type';
import { IUserExistRepository } from 'src/modules/user/types/repository/user-exist.interface';
import { ILoginService, ISignUpService } from '../types/service';
import { IUserFindRepository } from 'src/modules/user/types/repository/user-find.interface';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject(HASH_PASSWORD_SERVICE_TOKEN)
    private readonly _hashService: IHashService,
    @Inject(USER_FIND_REPOSITORY_TOKEN)
    private readonly _userFindRepository: IUserFindRepository,
  ) {}
  async findByEmailAndFail(email: string) {
    const user = await this._userFindRepository.findOne({
      select: ['id', 'email', 'password'],
      where: {
        email,
      },
    });
    if (!user) throw new Error(`${email} 유저를 찾을 수 없습니다.`);
    return user;
  }
  async validatePassword(password: string, hashPassword: string) {
    const result = await this._hashService.comparePassword(
      password,
      hashPassword,
    );
    if (!result) throw new Error('비밀번호가 다릅니다.');
  }
}

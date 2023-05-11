import { Inject, Injectable } from '@nestjs/common';
import { HashService } from '../common/hash/hash.service';
import { HASH_PASSWORD_SERVICE_TOKEN } from '../common/hash/hash.token';
import {
  USER_CREATE_REPOSITORY_TOKEN,
  USER_EXIST_REPOSITORY_TOKEN,
} from '../user/token';
import { ICreateUserParam } from '../user/types/dto/create-user.type';
import { IUserCreateRepository } from '../user/types/repository/user-create.interface';
import { IUserExistRepository } from '../user/types/repository/user-exist.interface';
import { SignUpService } from './service/sign-up.service';
import { AUTH_SIGNUP_SERVICE_TOKEN } from './token';
import { ILoginParam } from './types/dto';
import { ISignUpService } from './types/service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_SIGNUP_SERVICE_TOKEN)
    private readonly _signUpService: ISignUpService,
    @Inject(USER_EXIST_REPOSITORY_TOKEN)
    private readonly _userExistRepository: IUserExistRepository,
    @Inject(USER_CREATE_REPOSITORY_TOKEN)
    private readonly _userCreateRepository: IUserCreateRepository,
  ) {}

  async signUp(createUserParams: ICreateUserParam) {
    try {
      const { email, tel } = createUserParams;
      await this._signUpService.checkUniqueColumns(email, tel);
      const newUserParam = await this._signUpService.getNewUserParam(
        createUserParams,
      );
      return await this._userCreateRepository.save(newUserParam);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async login(loginParam: ILoginParam) {
    return loginParam;
  }
}

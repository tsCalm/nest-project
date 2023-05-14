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
import {
  AUTH_LOGIN_SERVICE_TOKEN,
  AUTH_SIGNUP_SERVICE_TOKEN,
  JWT_TOKEN_REPOSITORY_TOKEN,
} from './token';
import { ILoginParam } from './types/dto';
import { ILoginService, ISignUpService } from './types/service';
import { JwtService } from '@nestjs/jwt';
import { GENERATE_JWT_TYPE } from './enum';
import { ConfigService } from '@nestjs/config';
import { ITokenRepository } from './types/repository';
@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_SIGNUP_SERVICE_TOKEN)
    private readonly _signUpService: ISignUpService,
    @Inject(AUTH_LOGIN_SERVICE_TOKEN)
    private readonly _loginService: ILoginService,
    @Inject(USER_CREATE_REPOSITORY_TOKEN)
    private readonly _userCreateRepository: IUserCreateRepository,
    @Inject(JWT_TOKEN_REPOSITORY_TOKEN)
    private readonly _jwtTokenRepository: ITokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async generateToken(id: number, email: string, jwt_type: GENERATE_JWT_TYPE) {
    const tokenSecret = await this.configService.get(
      `JWT_${jwt_type}_TOKEN_SECRET`,
    );

    const tokenExpiresIn = this.configService.get(
      `JWT_${jwt_type}_TOKEN_EXPIRES_IN`,
    );
    return await this.jwtService.signAsync(
      { sub: id, email },
      { secret: tokenSecret, expiresIn: tokenExpiresIn },
    );
  }

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

  async login(loginParam: ILoginParam, isSocial: boolean = false) {
    try {
      const { email, password } = loginParam;
      const user = await this._loginService.findByEmailAndFail(email);
      const { id, password: hashPassword } = user;
      if (!isSocial) {
        this._loginService.validatePassword(password, hashPassword);
      }
      const accessTokenPending = this.generateToken(
        id,
        email,
        GENERATE_JWT_TYPE.ACCESS,
      );
      const refreshTokenPending = this.generateToken(
        id,
        email,
        GENERATE_JWT_TYPE.REFRESH,
      );
      const [accessToken, refreshToken] = await Promise.all([
        accessTokenPending,
        refreshTokenPending,
      ]);

      this._jwtTokenRepository.save(
        id,
        refreshToken,
        GENERATE_JWT_TYPE.REFRESH,
      );
      return { accessToken, refreshToken };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

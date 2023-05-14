import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { LOGIN_TYPE } from 'src/modules/user/enum';
import {
  USER_CREATE_REPOSITORY_TOKEN,
  USER_FIND_REPOSITORY_TOKEN,
} from 'src/modules/user/token';
import { IUserCreateRepository } from 'src/modules/user/types/repository/user-create.interface';
import { IUserFindRepository } from 'src/modules/user/types/repository/user-find.interface';
import { Request, RequestHandler } from 'express';
import { IKakaoProfile } from '../types/dto';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(USER_FIND_REPOSITORY_TOKEN)
    private readonly _userFindRepository: IUserFindRepository,
    @Inject(USER_CREATE_REPOSITORY_TOKEN)
    private readonly _userCreateRepository: IUserCreateRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET_ID'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function,
  ) {
    const {
      _json: { name, email },
    } = profile;

    if (email === undefined) {
      return {
        email: undefined,
        mobile: undefined,
        login_type: undefined,
        name: undefined,
        birthday: undefined,
        birthYear: undefined,
      };
    }
    const user = await this._userFindRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      // 회원가입, 필수항목을 정해도 네이버 로그인은 유저의 정보를 유저가 선택해서 보낼 수 있기 때문에 최소한의 정보로 유저 생성
      const newUserParam = this._userCreateRepository.getInstance({
        email,
        name,
        login_type: LOGIN_TYPE.GOOGLE,
      });
      return await this._userCreateRepository.save(newUserParam);
    }

    return user;
  }
}

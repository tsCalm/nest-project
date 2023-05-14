import { Inject, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-kakao-oauth2';
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

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @Inject(USER_FIND_REPOSITORY_TOKEN)
    private readonly _userFindRepository: IUserFindRepository,
    @Inject(USER_CREATE_REPOSITORY_TOKEN)
    private readonly _userCreateRepository: IUserCreateRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('KAKAO_CLIENT_ID'),
      clientSecret: configService.get('KAKAO_CLIENT_SECRET_ID'),
      callbackURL: configService.get('KAKAO_CALLBACK_URL'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: IKakaoProfile,
  ) {
    const { res } = req;

    const {
      _json: {
        properties: { nickname: name },
        kakao_account: { email },
      },
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
        login_type: LOGIN_TYPE.KAKAO,
      });
      return await this._userCreateRepository.save(newUserParam);
    }
    if (user.login_type !== LOGIN_TYPE.KAKAO)
      res.send(`${user.login_type} 로그인으로 다시 시도해주세요.`);
    return user;
  }
}

import { Profile, Strategy } from 'passport-naver-v2';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { LOGIN_TYPE } from 'src/modules/user/enum';
import {
  USER_CREATE_REPOSITORY_TOKEN,
  USER_FIND_REPOSITORY_TOKEN,
} from 'src/modules/user/token';
import { IUserCreateRepository } from 'src/modules/user/types/repository/user-create.interface';
import { IUserFindRepository } from 'src/modules/user/types/repository/user-find.interface';
import { Request } from 'express';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    @Inject(USER_FIND_REPOSITORY_TOKEN)
    private readonly _userFindRepository: IUserFindRepository,
    @Inject(USER_CREATE_REPOSITORY_TOKEN)
    private readonly _userCreateRepository: IUserCreateRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('NAVER_CLIENT_ID'),
      clientSecret: configService.get('NAVER_CLIENT_SECRET_ID'),
      callbackURL: configService.get('NAVER_CALLBACK_URL'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request & { socialError?: Error; user?: User },
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    const { res } = req;
    const { email, mobile = '', name } = profile;
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
      const tel = mobile.replaceAll('-', '');
      // 회원가입, 필수항목을 정해도 네이버 로그인은 유저의 정보를 유저가 선택해서 보낼 수 있기 때문에 최소한의 정보로 유저 생성
      const newUserParam = this._userCreateRepository.getInstance({
        email,
        name,
        tel,
        login_type: LOGIN_TYPE.NAVER,
      });
      return await this._userCreateRepository.save(newUserParam);
    }

    return user;
  }
}

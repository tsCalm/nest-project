import { Profile, Strategy } from 'passport-naver-v2';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserFindRepository } from 'src/modules/user/repository/user-find';
import {
  USER_CREATE_REPOSITORY_TOKEN,
  USER_FIND_REPOSITORY_TOKEN,
} from 'src/modules/user/token';
import { IUserFindRepository } from 'src/modules/user/types/repository/user-find.interface';
import { User } from 'src/modules/user/user.entity';
import { AuthService } from '../auth.service';
import { LOGIN_TYPE } from 'src/modules/user/enum';
import { IUserCreateRepository } from 'src/modules/user/types/repository/user-create.interface';
// import { Users } from 'src/entities/Users';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    @Inject(USER_FIND_REPOSITORY_TOKEN)
    private readonly _userFindRepository: IUserFindRepository,
    @Inject(USER_CREATE_REPOSITORY_TOKEN)
    private readonly _userCreateRepository: IUserCreateRepository,
    private readonly configService: ConfigService,
    private readonly _authService: AuthService,
  ) {
    super({
      clientID: configService.get('NAVER_CLIENT_ID'),
      clientSecret: configService.get('NAVER_CLIENT_SECRET_ID'),
      callbackURL: configService.get('NAVER_CALLBACK_URL'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
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
      // 회원가입
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

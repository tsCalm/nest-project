import { ExtractJwt, Strategy } from 'passport-jwt';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserFindRepository } from 'src/modules/user/repository/user-find';
import { USER_FIND_REPOSITORY_TOKEN } from 'src/modules/user/token';
import { IUserFindRepository } from 'src/modules/user/types/repository/user-find.interface';
// import { Users } from 'src/entities/Users';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(USER_FIND_REPOSITORY_TOKEN)
    private _userFindRepository: IUserFindRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(req: Request, payload: any) {
    const { id } = payload;
    const authorization = req.headers['authorization'];
    const token = authorization.split(' ')[1];

    return this._userFindRepository.findOne({
      select: ['id', 'email', 'name', 'address', 'birth', 'tel'],
      where: {
        id,
      },
    });
  }
}

import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class AccessTokenGuard extends AuthGuard('access-jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = Partial<User>>(err: Error, user: any): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('permission denied');
    }
    return user;
  }
}

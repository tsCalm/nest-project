import { ICreateUserParam } from 'src/modules/user/types/dto/create-user.type';
import { User } from '../../../user/user.entity';
import { GENERATE_JWT_TYPE } from '../../enum';
import { JwtToken } from '../../jwt-token.entity';

export interface ITokenRepository {
  save(
    user_id: number,
    token: string,
    type: GENERATE_JWT_TYPE,
  ): Promise<JwtToken>;
}

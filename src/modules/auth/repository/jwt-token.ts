import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GENERATE_JWT_TYPE } from '../enum';
import { JwtToken } from '../jwt-token.entity';
import { ITokenRepository } from '../types/repository';

@Injectable()
export class JwtTokenRepository implements ITokenRepository {
  constructor(
    @InjectRepository(JwtToken)
    protected readonly _jwtTokenRepo: Repository<JwtToken>,
  ) {}

  async save(user_id: number, token: string, type: GENERATE_JWT_TYPE) {
    const param = this._jwtTokenRepo.create({
      user_id,
      token,
      type,
    });
    return this._jwtTokenRepo.save(param);
  }

  // async findOne(user_id: number) {
  //   return this._jwtTokenRepo.findOne({
  //     where: {
  //       user_id,
  //     },
  //   });
  // }
}

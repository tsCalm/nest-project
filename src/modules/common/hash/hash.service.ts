import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { IHashService } from './hash.interface';

@Injectable()
export class HashService implements IHashService {
  constructor(private readonly configService: ConfigService) {}

  async hashPassword(password: string) {
    const envSaltParam = this.configService.get('JWT_SALT_PARAM');
    const saltParamNumber = Number(envSaltParam);
    const salt = await bcrypt.genSalt(saltParamNumber);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }
}

import { Module } from '@nestjs/common';
import { HashService } from '../common/hash-password.service';
import { AuthController } from './auth.ctrl';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, HashService],
})
export class AuthModule {}

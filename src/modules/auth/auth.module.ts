import { Module } from '@nestjs/common';
import { AuthController } from './auth.ctrl';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}

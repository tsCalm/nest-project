import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  @Get('me')
  async me() {
    return 'me';
  }
}

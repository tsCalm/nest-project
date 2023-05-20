import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { S3ManagerService } from '../common/aws/s3/service/s3-manager.service';
import { USER_SERVICE_TOKEN } from './token';
import { IUserService } from './types/service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly _userService: IUserService,
  ) {}

  @Get('profile/url')
  getPreSignedUrl(@Query('fileName') fileName: string) {
    if (!fileName)
      throw new BadRequestException('fileName은 빈 값을 허용하지 않습니다.');
    const bucketPath = `serverless/nest-project/dev/user/profile/${fileName}`;
    return this._userService.getPreSignedUrl(bucketPath);
  }

  @Get(':userId/profile/url/complete')
  completeProfileImage(
    @Query('fileName') fileName: string,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    if (!fileName)
      throw new BadRequestException('fileName은 빈 값을 허용하지 않습니다.');
    const bucketPath = `serverless/nest-project/dev/user/profile/${fileName}`;
    return this._userService.updateUserProfileImage(userId, bucketPath);
  }
}

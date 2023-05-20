import { Controller, Get } from '@nestjs/common';
import { S3ManagerService } from '../common/aws/s3/s3-manager.service';

@Controller('user')
export class UserController {
  constructor(private readonly s3ManagerService: S3ManagerService) {}
  @Get()
  testFunction() {
    return this.s3ManagerService.listBucketContents('test');
  }
}

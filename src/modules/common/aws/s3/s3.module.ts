// s3-manager.module.ts
import { Module } from '@nestjs/common';
import { S3ManagerService } from './service/s3-manager.service';
import { AWS_S3_MANAGER_SERVICE } from './token';

@Module({
  imports: [],
  providers: [
    {
      provide: AWS_S3_MANAGER_SERVICE,
      useClass: S3ManagerService,
    },
  ],
  exports: [
    {
      provide: AWS_S3_MANAGER_SERVICE,
      useClass: S3ManagerService,
    },
  ],
})
export class S3ManagerModule {}

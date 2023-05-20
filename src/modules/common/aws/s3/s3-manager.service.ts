// s3-manager.service.ts
import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
// const temp = new S3({
//   signatureVersion: 'v4',
//   region: 'ap-northeast-2',
// });
@Injectable()
export class S3ManagerService {
  constructor(
    @InjectAwsService(S3) private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {}

  async getPreSignedUrl(fileName: string) {
    const params = {
      Bucket: this.configService.get('BUCKET_NAME'),
      Key: `serverless/${fileName}`,
      Expires: 60 * 60 * 3,
    };
    return this.s3.getSignedUrlPromise('putObject', params);
  }
}

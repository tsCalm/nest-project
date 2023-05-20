import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { S3, SharedIniFileCredentials } from 'aws-sdk';

export default {
  defaultServiceOptions: {
    credentials: new SharedIniFileCredentials({
      profile: 'default',
    }),
    signatureVersion: 'v4',
    region: 'ap-northeast-2',
  },
  services: [S3],
};

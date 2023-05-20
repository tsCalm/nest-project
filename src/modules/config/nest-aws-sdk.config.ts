import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { S3, SharedIniFileCredentials } from 'aws-sdk';

export default {
  defaultServiceOptions: {
    credentials: new SharedIniFileCredentials({
      profile: 'default',
    }),
  },
  services: [S3],
};

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectConfigModule } from './modules/config';
import { UserModule } from './modules/user/user.module';
import { SharedIniFileCredentials, S3 } from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3ManagerModule } from './modules/common/aws/s3/s3.module';

@Module({
  imports: [
    ProjectConfigModule,
    UserModule,
    AuthModule,
    S3ManagerModule,
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        // region: 'us-east-1',
        credentials: new SharedIniFileCredentials({
          profile: 'default',
        }),
      },
      services: [S3],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

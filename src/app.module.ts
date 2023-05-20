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
import NestSdkConfig from './modules/config/nest-aws-sdk.config';
@Module({
  imports: [
    ProjectConfigModule,
    UserModule,
    AuthModule,
    S3ManagerModule,
    AwsSdkModule.forRoot(NestSdkConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

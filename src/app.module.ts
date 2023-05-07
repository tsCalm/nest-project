import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectConfigModule } from './modules/config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ProjectConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

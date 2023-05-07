import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectConfigModule } from './modules/config';

@Module({
  imports: [ProjectConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

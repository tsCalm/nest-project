import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfig from './env.config';
import { typeOrmConfigAsync } from './typeorm.config';

@Module({
  imports: [envConfig, TypeOrmModule.forRootAsync(typeOrmConfigAsync)],
})
export class ProjectConfigModule {}

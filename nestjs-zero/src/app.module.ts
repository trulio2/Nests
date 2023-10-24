import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
  ],
})
export class AppModule {}

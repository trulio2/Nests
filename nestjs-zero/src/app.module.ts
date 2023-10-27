import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from 'db/ormconfig';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
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

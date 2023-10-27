import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from 'db/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
  ],
})
export class AppModule {}

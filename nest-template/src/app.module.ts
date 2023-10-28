import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/ormconfig';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    CatsModule,
  ],
})
export class AppModule {}

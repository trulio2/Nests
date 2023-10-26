import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { Module } from '@nestjs/common';
import { dataSourceOptions } from 'db/data-source';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    EventsModule,
  ],
})
export class AppModule {}

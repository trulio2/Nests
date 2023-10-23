import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(dataSourceOptions)],
})
export class AppModule {}

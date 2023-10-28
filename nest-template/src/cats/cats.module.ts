import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { CatsService } from './cats.service';
import { Cat } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), AuthModule],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
})
export class CatsModule {}

import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const isProduction = process.env.NODE_ENV === 'prod';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    ssl: isProduction,
    extra: {
      ssl: isProduction ? { rejectUnauthorized: false } : null,
    },
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
  }),
);

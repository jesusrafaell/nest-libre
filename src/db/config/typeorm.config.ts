import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import 'dotenv/config';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'mssql',
    database: process.env.DB_DATA,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    options: {
      encrypt: true,
    },
    extra: {
      trustServerCertificate: true,
    },
    entities: [__dirname + '/src/db/models/**/*.entity.{js,ts}'],
    migrations: [__dirname + '/src/db/migrations/*{.ts,.js}'],
    // cli: {
    //   migrationsDir: __dirname + '/../db/migrations',
    // },
    synchronize: false,
    logging: true,
  }),
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: __dirname + '/../database/migrations',
  // },
  /*
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  */
  synchronize: false,
  logging: true,
};

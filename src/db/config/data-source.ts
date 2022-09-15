import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'mssql',
  host: '10.198.72.11',
  username: 'amendoza',
  password: 'Am1523246.',
  database: 'librepago',
  options: {
    encrypt: false,
  },
  requestTimeout: 3000000,
  connectionTimeout: 3000000,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  entities: ['./src/db/models/**/*.ts', 'compiled-js/typeorm/**/*.js'],
  migrations: ['./src/db/migrations/**/*.ts'],
  subscribers: ['./src/db/subscriber/**/*.ts'],
});

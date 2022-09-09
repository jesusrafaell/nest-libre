import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join, resolve } from 'path';
import { AuthModule } from './auth/auth.module';
import Usuarios from './db/models/usuarios.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: '10.198.72.11',
      port: 1433,
      username: 'amendoza',
      password: 'Am1523246.',
      database: 'librepago',
      type: 'mssql',
      options: {
        encrypt: true,
      },
      extra: {
        trustServerCertificate: true,
      },
      //
      entities: [Usuarios],
    }),
    AuthModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RepoModule from './repo.module';
//
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join, resolve } from 'path';
import { GraphQLModule } from '@nestjs/graphql';

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
    }),
    RepoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

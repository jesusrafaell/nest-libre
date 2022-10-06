import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { AuthModule } from './auth/auth.module';
import { CommerceModule } from './commerce/commerce.module';
import { TerminalsModule } from './terminals/terminals.module';
import { TestApiModule } from './testAPI/testAPi.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (Config: ConfigService) => ({
        type: 'mssql',
        host: process.env.DB_HOST,
        database: process.env.DB_DATA,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        logging: false,
        options: {
          encrypt: true,
        },
        extra: {
          trustServerCertificate: true,
        },
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    CommerceModule,
    TerminalsModule,
    TestApiModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join, resolve } from 'path';
import { AuthModule } from './auth/auth.module';
import { CommerceModule } from './commerce/commerce.module';
import Abonos from './db/models/abono.entity';
import Afiliados from './db/models/afiliados.entity';
import CategoriasXafiliado from './db/models/categoriasXafiliado.entity';
import Comercios from './db/models/comercios.entity';
import ComerciosXafiliado from './db/models/comerciosXafliado.entity';
import ComisionesMilPagos from './db/models/comisionesmilpagos.entity';
import Contactos from './db/models/contactos.entity';
import Perfiles from './db/models/perfiles.entity';
import Usuarios from './db/models/usuarios.entity';
import { TerminalsModule } from './terminals/terminals.module';
import 'dotenv/config';

const defaultOptions = {
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
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
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
      //entities: [join(__dirname, '**', '*.entity.{js,ts}')],
      entities: [
        Usuarios,
        Perfiles,
        Comercios,
        Contactos,
        ComisionesMilPagos,
        ComerciosXafiliado,
        Abonos,
        CategoriasXafiliado,
        Afiliados,
      ],
    }),
    AuthModule,
    CommerceModule,
    TerminalsModule,
  ],
})
export class AppModule {}

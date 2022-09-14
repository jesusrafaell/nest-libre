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
import { UsuariosModule } from './usuarios/usuarios.module';

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
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}

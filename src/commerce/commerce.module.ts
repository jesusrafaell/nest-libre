import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommerceService } from './commerce.service';
import { CommerceController } from './commerce.controller';
import Comercios from '../db/models/comercios.entity';
import Contactos from '../db/models/contactos.entity';
import ComisionesMilPagos from '../db/models/comisionesmilpagos.entity';
import ComerciosXafiliado from '../db/models/comerciosXafliado.entity';
import Afiliados from '../db/models/afiliados.entity';
import CategoriasXafiliado from '../db/models/categoriasXafiliado.entity';
import AfiliadosLibrePago from '../db/models/afiliados_librepago.entity';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comercios,
      Contactos,
      ComisionesMilPagos,
      ComerciosXafiliado,
      CategoriasXafiliado,
      Afiliados,
      AfiliadosLibrePago,
    ]),
    LogsModule,
  ],
  controllers: [CommerceController],
  providers: [CommerceService],
  exports: [CommerceService],
})
export class CommerceModule {}

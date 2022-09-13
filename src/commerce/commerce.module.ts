import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommerceService } from './commerce.service';
import Usuarios from 'src/db/models/usuarios.entity';
import { CommerceController } from './commerce.controller';
import Comercios from 'src/db/models/comercios.entity';
import Contactos from 'src/db/models/contactos.entity';
import ComisionesMilPagos from 'src/db/models/comisionesmilpagos.entity';
import ComerciosXafiliado from 'src/db/models/comerciosXafliado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comercios,
      Contactos,
      ComisionesMilPagos,
      ComerciosXafiliado,
    ]),
  ],
  controllers: [CommerceController],
  providers: [CommerceService],
  exports: [CommerceService],
})
export class CommerceModule {}

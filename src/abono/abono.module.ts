import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbonoService } from './abono.service';
import Usuarios from 'src/db/models/usuarios.entity';
import Comercios from 'src/db/models/comercios.entity';
import Contacitos from 'src/db/models/contactos.entity';
import ComisionesMilPagos from 'src/db/models/comisionesmilpagos.entity';
import ComerciosXafiliado from 'src/db/models/comerciosXafliado.entity';
import Abonos from 'src/db/models/abono.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Abonos])],
  providers: [AbonoService],
  exports: [AbonoService],
})
export class AbonoModule {}

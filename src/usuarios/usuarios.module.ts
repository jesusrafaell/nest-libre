import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './services/usuarios.service';
import Usuarios from '../db/models/usuarios.entity';
import Perfiles from '../db/models/perfiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios, Perfiles])],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import Usuarios from 'src/db/models/usuarios.entity';
import Perfiles from 'src/db/models/perfiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios, Perfiles])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}

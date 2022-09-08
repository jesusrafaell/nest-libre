import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuariosRepository } from './usuarios.repository';
import Usuarios from 'src/db/models/usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuarioModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import Usuarios from 'src/db/models/usuarios.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  //controllers: [AuthController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}

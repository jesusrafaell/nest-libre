import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import Usuarios from './db/models/usuarios.entity';
import { RouterModule } from '@nestjs/core';
//
import { UsuarioModule } from './usuarios/usuarios.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Usuarios]), UsuarioModule],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;

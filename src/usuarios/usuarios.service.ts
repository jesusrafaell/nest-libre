import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Usuarios from '../db/models/usuarios.entity';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { exec } from 'child_process';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
  ) {}

  async getUsuario(user: LoginUsuarioDto): Promise<Usuarios> {
    const { login, password } = user;
    const usuarioExist = await this.usuarioRepository.findOne({
      where: { login, contrasena: password },
    });

    if (!usuarioExist) throw new NotFoundException('Este usuario no existe');

    return usuarioExist;
  }

  async getUsuarios(): Promise<Usuarios[]> {
    try {
      console.log('hola');
      const usuarios = await this.usuarioRepository.find();

      if (!usuarios.length) throw new NotFoundException('No existen usuarios');

      return usuarios;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

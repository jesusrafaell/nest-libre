import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { CreateusuarioDto } from './dto/create-usuario.dto';
//import { UpdateusuarioDto } from './dto/update-usuario.dto';
import Usuarios from '../db/models/usuarios.entity';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UsuariosRepository } from './usuarios.repository';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuariosRepository)
    private readonly _usuarioRepository: UsuariosRepository,
  ) {}

  async login(user: LoginUsuarioDto): Promise<Usuarios> {
    const usuarioExist = await this._usuarioRepository.findOne({
      where: { login: user.login },
    });
    if (!usuarioExist) throw new NotFoundException('Este usuario no existe');
    return usuarioExist;
  }

  async getUser(): Promise<string> {
    return 'Respuesta';
  }

  /*
  async create(createusuarioDto: CreateusuarioDto): Promise<Usuarios> {
    const newusuario = await this._usuarioRepository.save({
      name: createusuarioDto.name,
      content: createusuarioDto.content,
    });
    return newusuario;
  }
  */
}

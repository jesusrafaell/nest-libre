import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUsuarioDto } from '../dto/login-usuario.dto';
import { Injectable } from '@nestjs/common';
import Perfiles from '../../db/models/perfiles.entity';
import Usuarios from '../../db/models/usuarios.entity';
import 'dotenv/config';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly _usuarioRepository: Repository<Usuarios>,
    @InjectRepository(Perfiles)
    private readonly _perfilesRepository: Repository<Perfiles>,
  ) {}

  async getUsuario(user: LoginUsuarioDto): Promise<Usuarios> {
    return await this._usuarioRepository.findOne({
      where: { login: user.login, contrasena: user.password },
    });
  }

  async validatePerfil(user: Usuarios): Promise<boolean> {
    const perfil = await this._perfilesRepository.findOne({
      where: { id: user.perfilId },
    });

    if (!perfil) return true;

    if (
      //user.perfilId !== Number(process.env.PERFIL_ACCESS) &&
      perfil.nombre !== 'API'
    ) {
      return true;
    }
    return false;
  }
}

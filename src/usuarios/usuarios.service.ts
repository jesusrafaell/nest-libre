import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Injectable } from '@nestjs/common';
import Perfiles from 'src/db/models/perfiles.entity';
import Usuarios from 'src/db/models/usuarios.entity';
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
    const perfil = await this._perfilesRepository.findOneById(user.perfilId);

    if (!perfil) return false;

    if (
      user.perfilId !== Number(process.env.PERFIL_ACCESS) &&
      perfil.nombre !== 'api'
    ) {
      return true;
    }
    return false;
  }
}

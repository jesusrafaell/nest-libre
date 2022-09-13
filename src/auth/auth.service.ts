import { Injectable, NotFoundException } from '@nestjs/common';
import Usuarios from '../db/models/usuarios.entity';
import { LoginUsuarioDto, Token } from './dto/login-usuario.dto';
import { exec } from 'child_process';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsuariosService,
    private readonly jwtService: JwtService, //private usersService: UsersService,
  ) {}

  execCommand(password: string) {
    const cmd = `java -jar java.encript/java.jar ${password}`;
    return new Promise((resolve) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.warn(error);
        }
        resolve(stdout ? stdout : stderr);
      });
    });
  }

  async jwtLogin(email: string, id: number): Promise<Token> {
    const payload = { email, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: LoginUsuarioDto): Promise<Token> {
    const encriptPass = await this.execCommand(user.password);

    user.password = encriptPass as string;

    const usuario: Usuarios = await this.userService.getUsuario(user); //console.log('aqui', usuario);

    //console.log(usuario);

    if (!usuario) throw new NotFoundException('Usuario o clave invalida');

    const validPerfil = await this.userService.validatePerfil(usuario);

    if (validPerfil) {
      throw new NotFoundException(
        'Este Usuario no tiene el perfil para usar la API',
      );
    }

    return this.jwtLogin(usuario.email, usuario.id);
  }
}

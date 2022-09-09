import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Usuarios from '../db/models/usuarios.entity';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { exec } from 'child_process';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuarios)
    private userService: UsuariosService,
    private readonly usuarioRepository: Repository<Usuarios>,
    private jwtService: JwtService, //private usersService: UsersService,
  ) {}

  execCommand(cmd: string, password: string) {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.warn(error);
        }
        resolve(stdout ? stdout : stderr);
      });
    });
  }
  async jwtLogin(email: string, id: number) {
    const payload = { email, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: LoginUsuarioDto): Promise<Usuarios> {
    const encriptPass = await this.execCommand(
      `java -jar java.encript/java.jar ${user.password}`,
      user.password,
    );

    //console.log('clave:', encriptPass);

    const usuario = await this.userService.getUsuario({
      login: user.login,
      password: encriptPass as string,
    });

    console.log(usuario);

    if (!usuario) throw new NotFoundException('Este usuario no existe');

    return usuario;
  }

  async getUser(): Promise<string> {
    return 'Ok';
  }
}

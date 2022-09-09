import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UsuariosService } from './usuarios.service';

@UsePipes(ValidationPipe)
@Controller('Usuarios')
export class UsuariosController {
  constructor(private readonly UsuariosService: UsuariosService) {}

  @Get()
  getUsuario(@Body() login: LoginUsuarioDto) {
    return this.UsuariosService.getUsuario(login);
  }
}

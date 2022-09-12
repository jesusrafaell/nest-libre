import {
  Controller,
  Get,
  Request,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UsuariosService } from './usuarios.service';

@UsePipes(ValidationPipe)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly UsuariosService: UsuariosService) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  getUsuario(@Body() login: LoginUsuarioDto) {
    return this.UsuariosService.getUsuario(login);
  }

  @UseGuards(JwtAuthGuard)
  @Get('d')
  getUsuarios() {
    console.log('get usuarios');
    return this.UsuariosService.getUsuarios();
  }
}

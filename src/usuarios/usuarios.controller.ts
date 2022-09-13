import {
  Controller,
  Get,
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
}

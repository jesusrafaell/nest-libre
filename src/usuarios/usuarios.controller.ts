import {
  Controller,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
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

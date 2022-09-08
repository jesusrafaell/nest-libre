import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UsuariosService } from './usuarios.service';
//import { CreateUsuariosDto } from './dto/create-Usuarios.dto';
//import { UpdateUsuariosDto } from './dto/update-Usuarios.dto';

@UsePipes(ValidationPipe)
@Controller('Usuarios')
export class UsuariosController {
  constructor(private readonly UsuariosService: UsuariosService) {}

  @Post()
  login(@Body() login: LoginUsuarioDto) {
    return this.UsuariosService.login(login);
  }

  @Get()
  get() {
    return this.UsuariosService.getUser();
  }
}

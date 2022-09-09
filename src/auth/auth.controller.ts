import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { AuthService } from './auth.service';

@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private readonly UsuariosService: AuthService) {}

  @Post()
  login(@Body() login: LoginUsuarioDto) {
    return this.UsuariosService.login(login);
  }

  @Get()
  get() {
    return this.UsuariosService.getUser();
  }
}

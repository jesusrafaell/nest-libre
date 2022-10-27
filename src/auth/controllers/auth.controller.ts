import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUsuarioDto, Token } from '../dto/login-usuario.dto';
import { AuthService } from '../services/auth.service';

@UsePipes(ValidationPipe)
@Controller()
//@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  login(@Body() login: LoginUsuarioDto): Promise<Token> {
    return this.authService.login(login);
  }
}

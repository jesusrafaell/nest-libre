import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import 'dotenv/config';
//
import { UsuariosModule } from '../usuarios/usuarios.module';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    LogsModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

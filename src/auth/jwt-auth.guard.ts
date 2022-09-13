import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    //console.log(info);
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('Token expiro');
    }
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Token invalido');
    }

    return super.handleRequest(err, user, info, context, status);
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private jwt = new JwtService();
  async use(req: Request, res: Response, next: Function) {
    res.on('close', async () => {
      if (res.statusCode < 300 && res.statusCode > 199) {
        const token = req.headers.authorization.replace('Bearer ', '');
        const json = this.jwt.decode(token);
        console.log('token', json);
        console.log(res.statusMessage);
        console.log('1->', req.url);
      }
    });
    next();
  }
}

import { Injectable } from '@nestjs/common';
import { Resp } from 'src/commerce/commerce.service';
import 'dotenv/config';

@Injectable()
export class TerminalsService {
  constructor() {}

  async createTerminals(
    comerRif: string,
    comerCantPost: number,
  ): Promise<Resp> {
    try {
      const info = {
        message: 'Terminales',
      };
      console.log('crear terminales');
      return info;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

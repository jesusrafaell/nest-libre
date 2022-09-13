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
      console.log(comerRif, comerCantPost);
      //validar si exsite el comercio
      //verificar el numero de afiliado del comercio
      //
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

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import Comercios from 'src/db/models/comercios.entity';
import Abonos from 'src/db/models/abono.entity';

export interface Resp {
  message?: string;
}

@Injectable()
export class AbonoService {
  constructor(
    @InjectRepository(Abonos)
    private readonly _abonoRepository: Repository<Abonos>,
  ) {}

  async createAbono(
    terminals: any[],
    commerce: Comercios,
    cxaCodAfi: string,
  ): Promise<Resp> {
    try {
      const abono: Abonos[] = terminals.map((terminal: any) => ({
        aboTerminal: terminal,
        aboCodAfi: cxaCodAfi,
        aboCodComercio: commerce.comerCod,
        aboCodBanco: commerce.comerCodigoBanco,
        aboNroCuenta: commerce.comerCuentaBanco,
        aboTipoCuenta: '01',
        estatusId: 23,
      }));

      await this._abonoRepository.save(abono);

      const info = {
        message: 'abono',
      };

      return info;
    } catch (e) {
      throw new NotFoundException('Error al crear abonos');
    }
  }
}

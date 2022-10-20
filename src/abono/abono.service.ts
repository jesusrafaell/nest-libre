import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Abonos from '../db/models/abono.entity';
import Comercios from '../db/models/comercios.entity';

export interface RespAbono {
  message: string;
  terminales?: string[];
  terminales_Error?: string[];
  code?: number;
}

@Injectable()
export class AbonoService {
  constructor(
    @InjectRepository(Abonos)
    private readonly _abonoRepository: Repository<Abonos>,
  ) {}

  async createAbono(
    terminals: string[],
    commerce: Comercios,
    cxaCodAfi: string,
  ): Promise<RespAbono> {
    try {
      console.log('crear abono');

      const exist_termianls = await this._abonoRepository
        .createQueryBuilder('abonos')
        .select('abonos.aboTerminal')
        .where('abonos.aboTerminal IN (:...terminals)', { terminals })
        .getMany();

      const newTerminals: string[] = terminals.filter(
        (term: string) =>
          !exist_termianls.find((terminal) => terminal.aboTerminal === term),
      );

      const abono: Abonos[] = newTerminals.map((terminal: string) => ({
        aboTerminal: terminal,
        aboCodAfi: cxaCodAfi,
        aboCodComercio: commerce.comerCod,
        aboCodBanco: commerce.comerCodigoBanco,
        aboNroCuenta: commerce.comerCuentaBanco,
        aboTipoCuenta: '01',
        estatusId: 23,
      }));

      console.log('nuevos', newTerminals);
      console.log('existe', exist_termianls);

      const abonosSaves = await this._abonoRepository.save(abono);

      const info: RespAbono = {
        message: '',
      };

      if (exist_termianls.length) {
        //info.terminales_Error = exist_termianls.map((term) => term.aboTerminal);
        info.code = 202;
      }

      //console.log('creado el abono', abonosSaves);
      info.message = `[${commerce.comerRif}] Terminales creados: ${abonosSaves.length}, terminales rechazados: ${exist_termianls.length}`;
      if (newTerminals.length) info.terminales = newTerminals;
      return info;
    } catch (e) {
      console.log('Abono error:', e);
      return {
        message: `Error al crear abono a los terminales, por favor contactar a Tranred`,
        code: 400,
      };
    }
  }
}

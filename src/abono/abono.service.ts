import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Comercios from 'src/db/models/comercios.entity';
import Abonos from 'src/db/models/abono.entity';

export interface RespAbono {
  message: string;
  terminales?: string[];
  terminales_Error?: string[];
}

@Injectable()
export class AbonoService {
  constructor(
    @InjectConnection()
    private readonly _userRepo: Connection,

    //
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

      const newTerminals: string[] = terminals.map((term: string) => {
        if (exist_termianls.filter((terminal) => terminal.aboTerminal === term))
          return term;
      });

      const abono: Abonos[] = newTerminals.map((terminal: string) => ({
        aboTerminal: terminal,
        aboCodAfi: cxaCodAfi,
        aboCodComercio: commerce.comerCod,
        aboCodBanco: commerce.comerCodigoBanco,
        aboNroCuenta: commerce.comerCuentaBanco,
        aboTipoCuenta: '01',
        estatusId: 23,
      }));

      /*
      const newTerminals = await this._abonoRepository
        .createQueryBuilder('abonos')
        .select('abonos.aboTerminal')
        .where('abonos.aboTerminal NOT IN (:...terminals)', { terminals })
        .getMany();
        */

      console.log('nuevos', newTerminals);
      console.log('existe', exist_termianls);

      //const abonosSaves = await this._abonoRepository.save(abono);
      //console.log('creado el abono', abonosSaves);
      const info: RespAbono = {
        message: '',
      };
      info.message = `Se crearon ${newTerminals.length} terminales, y se rechazaron ${exist_termianls} terminales`;
      if (newTerminals.length) info.terminales = newTerminals;
      if (exist_termianls.length)
        info.terminales_Error = exist_termianls.map((term) => term.aboTerminal);
      return info;
    } catch (e) {
      console.log('Abono error:', e);
      return {
        message: `Error al crear abono a los terminales, por favor contactar a Tranred`,
        terminales: terminals,
      };
    }
  }
}

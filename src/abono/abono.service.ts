import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import Comercios from 'src/db/models/comercios.entity';
import Abonos from 'src/db/models/abono.entity';
import { find } from 'rxjs';

export interface Resp {
  message?: string;
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
  ): Promise<boolean> {
    try {
      console.log('crear abono');
      const abono: Abonos[] = terminals.map((terminal: any) => ({
        aboTerminal: terminal,
        aboCodAfi: cxaCodAfi,
        aboCodComercio: commerce.comerCod,
        aboCodBanco: commerce.comerCodigoBanco,
        aboNroCuenta: commerce.comerCuentaBanco,
        aboTipoCuenta: '01',
        estatusId: 23,
      }));

      const exist_termianls = await this._abonoRepository
        .createQueryBuilder('abonos')
        .select('abonos.aboTerminal')
        .where('abonos.aboTerminal IN (:...terminals)', { terminals })
        .getMany();

      const newTerminals = terminals.filter((term: string) =>
        exist_termianls.find((terminal) => terminal.aboTerminal === term),
      );

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
    } catch (e) {
      console.log('Abono error:', e);
      return false;
    }

    return true;
  }
}

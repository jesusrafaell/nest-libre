import { BadRequestException, Injectable } from '@nestjs/common';
import { CommerceService } from 'src/commerce/commerce.service';
import 'dotenv/config';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AbonoService } from 'src/abono/abono.service';
import formatTerminals from 'src/utils/formatTerminals';

export interface RespTerm {
  message: string;
  terminales?: string[];
  code?: number;
}

@Injectable()
export class TerminalsService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private commerceService: CommerceService,
    private abonoService: AbonoService,
  ) {}

  async createTerminals(
    comerRif: string,
    comerCantPost: number,
  ): Promise<RespTerm> {
    console.log(comerRif, comerCantPost);
    //validar si exsite el comercio
    const commerce = await this.commerceService.getCommerce(comerRif);

    if (!commerce)
      throw new BadRequestException(
        `Comercio [${comerRif}] no se encuentra registrado`,
      );
    //verificar el numero de afiliado del comercio
    const afiliado = await this.commerceService.getAfiliadoByCommerce(
      commerce.comerCod,
    );

    if (!afiliado)
      throw new BadRequestException(
        `Comercio [${commerce.comerRif}] no tiene un numero de afiliado`,
      );

    console.log('Afiliado', Number(afiliado.cxaCodAfi));

    const responseSP = await this.connection.query(
      `EXEC SP_new_terminal 
			@Cant_Term = ${comerCantPost},
			@Afiliado = '${Number(afiliado.cxaCodAfi)}',
			@NombreComercio = '${commerce.comerDesc}',
			@Proveedor = 8,
			@TipoPos = 'ICT220 Dual',
			@Modo = 'Comercio',
			@TecladoAbierto = 0,
			@Observaciones = '${
        commerce.comerObservaciones ? commerce.comerObservaciones : ''
      }',
			@UsuarioResponsable = 'API Librepago'`,
    );

    let info: RespTerm = {
      message: '',
    };

    console.log('Res Exec', responseSP);
    if (!responseSP || !responseSP.length) {
      info.message =
        'Vuelva a intentar esta accion en 10 minutos, estamos creando terminales';
      return info;
    } else {
      const nroTerminals = formatTerminals(responseSP);
      console.log('termianles', nroTerminals);
      //
      const abono = await this.abonoService.createAbono(
        nroTerminals,
        commerce,
        afiliado.cxaCodAfi,
      );
      if (!abono) {
        throw new BadRequestException({
          message: `Error al crear los abonos de los terminales`,
          terminales: nroTerminals,
        });
      }

      if (responseSP.length < comerCantPost) {
        info.message = `Terminales creadas: ${nroTerminals.length}, para crear mas espere 10 minutos`;
        info.terminales = nroTerminals;
        info.code = 202;
        return info;
      } else {
        (info.message = 'Terminales creadas'), (info.terminales = nroTerminals);
        return info;
      }
    }
  }
}

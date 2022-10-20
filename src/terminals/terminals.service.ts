import {
  BadRequestException, // 400
  Injectable,
  NotFoundException, //404
} from '@nestjs/common';
import { CommerceService } from '../commerce/commerce.service';
import 'dotenv/config';
import { AbonoService, RespAbono } from '../abono/abono.service';
import formatTerminals from '../utils/formatTerminals';
import { DataSource } from 'typeorm';
import { LogHeader } from '../logs/dto/dto-logs.dto';
import { LogsService } from '../logs/logs.service';

export interface RespTerm {
  message: string;
  terminales?: string[];
  terminales_Error?: string[];
  code?: number;
}

@Injectable()
export class TerminalsService {
  constructor(
    private dataSource: DataSource,
    private logService: LogsService,
    private commerceService: CommerceService,
    private abonoService: AbonoService,
  ) {}

  async createTerminals(
    comerRif: string,
    comerCantPost: number,
    log: LogHeader,
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

    const responseSP = await this.dataSource.query(
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
      throw new NotFoundException(
        'Vuelva a intentar esta accion en 10 minutos, estamos creando terminales',
      );
    } else {
      const nroTerminals = formatTerminals(responseSP);
      console.log('termianles', nroTerminals);
      //
      const abono: RespAbono = await this.abonoService.createAbono(
        nroTerminals,
        commerce,
        afiliado.cxaCodAfi,
      );
      if (!abono || abono.code === 400) {
        throw new BadRequestException({
          message: `Error al crear abono a los terminales, por favor contactar a Tranred`,
          terminales: nroTerminals,
        });
      }

      if (responseSP.length < comerCantPost) {
        info.message =
          abono.message +
          (abono.terminales.length > 0 &&
            `, solo teniamos disponibles ${responseSP.length} espere 10 minutos`);
        info.code = 203;
        info.terminales = abono.terminales;

        //
        log.msg = info.message;
        await this.logService.saveLogsToken(log);

        return info;
      } else {
        if (abono.terminales.length > 0) {
          log.msg = abono.message;
          await this.logService.saveLogsToken(log);
          return abono;
        }
        throw new BadRequestException({
          message: abono.message,
        });
      }
    }
  }
}

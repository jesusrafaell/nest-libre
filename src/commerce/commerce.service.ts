import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, getConnection, Repository } from 'typeorm';
import { CommerceDto } from './dto/new-commerce.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { daysToString, locationToString } from 'src/utils/formatString';
import Comercios from 'src/db/models/comercios.entity';
import Contactos from 'src/db/models/contactos.entity';
import ComerciosXafiliado from 'src/db/models/comerciosXafliado.entity';
import ComisionesMilPagos from 'src/db/models/comisionesmilpagos.entity';

export interface Resp {
  message?: string;
}

@Injectable()
export class CommerceService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    //
    @InjectRepository(Comercios)
    private readonly _commerceRepository: Repository<Comercios>,
    //
    @InjectRepository(Contactos)
    private readonly _contactosRepositoy: Repository<Contactos>,
    //
    @InjectRepository(ComerciosXafiliado)
    private readonly _comerciosXAfiliado: Repository<ComerciosXafiliado>,
    //
    @InjectRepository(ComisionesMilPagos)
    private readonly _comisionesMilPagos: Repository<ComisionesMilPagos>,
  ) {}

  async createCommerce(body: CommerceDto): Promise<Resp> {
    const { commerce, contacto } = body;

    //Validar si el afiliado existe y es de librepago
    /*
     */

    const newCommerce: Comercios = {
      comerDesc: commerce.comerDesc,
      comerTipoPer: commerce.comerTipoPer,
      comerCodigoBanco: commerce.comerCodigoBanco,
      comerCuentaBanco: commerce.comerCuentaBanco,
      comerPagaIva: 'SI',
      comerCodUsuario: null,
      comerCodPadre: 0,
      comerRif: commerce.comerRif,
      comerFreg: null,
      comerCodTipoCont: commerce.comerCodTipoCont,
      comerInicioContrato: DateTime.local().toISODate(),
      comerFinContrato: DateTime.local().plus({ years: 1 }).toISODate(),
      comerExcluirPago: 0,
      comerCodCategoria: 5411,
      comerGarantiaFianza: 1,
      comerModalidadGarantia: 1,
      comerMontoGarFian: 7.77,
      comerModalidadPos: 3,
      comerTipoPos: commerce.comerTipoPos,
      comerRecaudos: null,
      comerDireccion: locationToString(commerce.locationCommerce),
      comerObservaciones: commerce.comerObservaciones,
      comerCodAliado: 84,
      comerEstatus: 5,
      comerHorario: null,
      comerImagen: null,
      comerPuntoAdicional: commerce.comerPuntoAdicional,
      comerCodigoBanco2: commerce.comerCodigoBanco2 || '',
      comerCuentaBanco2: commerce.comerCuentaBanco2 || '',
      comerCodigoBanco3: commerce.comerCodigoBanco3 || '',
      comerCuentaBanco3: commerce.comerCuentaBanco3 || '',
      //
      comerDireccionHabitacion: locationToString(commerce.locationContact),
      comerDireccionPos: locationToString(commerce.locationPos),
      comerDiasOperacion: daysToString(commerce.daysOperacion),
      comerFechaGarFian: null,
    };

    console.log(newCommerce);

    let comercioSave: Comercios | undefined =
      await this._commerceRepository.findOne({
        where: { comerRif: commerce.comerRif },
      });

    if (!comercioSave) {
      comercioSave = await this._commerceRepository.save(newCommerce);
      console.log('listo comercio');
      //Contacto
      const newContacto: Contactos = {
        contCodComer: comercioSave!.comerCod,
        contNombres: contacto.contNombres,
        contApellidos: contacto.contApellidos,
        contTelefLoc: contacto.contTelefLoc,
        contTelefMov: contacto.contTelefLoc,
        contMail: contacto.contMail,
        contCodUsuario: null,
        contFreg: null,
      };

      await this._contactosRepositoy.save(newContacto);
      console.log('listo contacto');

      const cxaCodAfi = `${commerce.idActivityXAfiliado}`.split('');
      while (cxaCodAfi.length < 15) cxaCodAfi.unshift('0');
      const cxaCod: string = cxaCodAfi.join('');

      //Crear comerxafiliado
      let comerXafiSave = await this._comerciosXAfiliado.findOne({
        where: { cxaCodComer: comercioSave!.comerCod },
      });

      if (!comerXafiSave) {
        comerXafiSave = await this._comerciosXAfiliado.save({
          cxaCodAfi: cxaCod,
          cxaCodComer: comercioSave!.comerCod,
        });
        console.log('listo comercioxafilido');
      } else {
        console.log('ComercioXafiliado ya existe', comercioSave?.comerCod);
      }

      //Crear Comision
      let comisionSave = await this._comisionesMilPagos.findOne({
        where: { cmCodComercio: comercioSave!.comerCod },
      });

      console.log('existe comision', comisionSave);

      if (!comisionSave) {
        this.connection.query(`
						INSERT INTO [dbo].[ComisionesMilPagos]
							([cmCodComercio] ,[cmPorcentaje])
						VALUES (${comercioSave?.comerCod} ,0)				
        `);
      }

      console.log('listo comisionmilpagos');
    } else {
      throw new NotFoundException(
        `El comercio ${commerce.comerRif} ya se encuentra registrado`,
      );
    }

    const info = {
      message: `Comerico ${commerce.comerRif} creado con exito`,
    };

    return info;
  }
}

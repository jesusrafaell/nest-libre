import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CommerceDto } from './dto/new-commerce.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { daysToString, locationToString } from '../utils/formatString';
import Comercios from '../db/models/comercios.entity';
import Contactos from '../db/models/contactos.entity';
import ComerciosXafiliado from '../db/models/comerciosXafliado.entity';
import ComisionesMilPagos from '../db/models/comisionesmilpagos.entity';
import CategoriasXafiliado from '../db/models/categoriasXafiliado.entity';
import Afiliados from '../db/models/afiliados.entity';
import AfiliadosLibrePago from '../db/models/afiliados_librepago.entity';
import { LogHeader } from '../logs/dto/dto-logs.dto';
import { LogsService } from '../logs/logs.service';

export interface Resp {
  message?: string;
}

@Injectable()
export class CommerceService {
  constructor(
    private dataSource: DataSource,
    private logService: LogsService,
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
    //
    @InjectRepository(CategoriasXafiliado)
    private readonly _categoriasXafiliado: Repository<CategoriasXafiliado>,
    //
    @InjectRepository(AfiliadosLibrePago)
    private readonly _afiliadosLibrepagoRepository: Repository<AfiliadosLibrePago>,
    //
    @InjectRepository(Afiliados)
    private readonly _afiliadosRepository: Repository<Afiliados>,
  ) {}

  async getCategoriaByAfiliado(
    catCodAfi: string,
  ): Promise<CategoriasXafiliado> {
    return this._categoriasXafiliado.findOne({
      where: { catCodAfi },
    });
  }

  async getCommerce(comerRif: string): Promise<Comercios> {
    return this._commerceRepository.findOne({
      where: { comerRif },
    });
  }

  async createCommerce(body: CommerceDto, log: LogHeader): Promise<Resp> {
    const { commerce, contacto } = body;

    //validar si el comercio existe
    if (await this.getCommerce(commerce.comerRif)) {
      throw new BadRequestException(
        `Comercio [${commerce.comerRif}] ya existe`,
      );
    }

    const { idActivityXAfiliado: cxaCod } = commerce;
    console.log('numero de afiliado', cxaCod);

    //[3312] MOdifcar el afilaido apra que busque en mi tabla
    console.log('bu1', cxaCod);

    const afiliadoGeneral = await this._afiliadosRepository.findOne({
      where: { afiCod: cxaCod },
    });

    if (!afiliadoGeneral)
      throw new BadRequestException(
        `No existe el numero de afiliado [${cxaCod}]`,
      );

    const afiliado = await this._afiliadosLibrepagoRepository.findOne({
      where: { afiliado: cxaCod },
    });

    if (!afiliado)
      throw new BadRequestException(
        `El numero de afiliado [${cxaCod}], no esta disponible`,
      );

    const categoria = await this.getCategoriaByAfiliado(afiliado.afiliado);

    if (!categoria)
      throw new BadRequestException(
        `No existe categoria comercial del afiliado [${afiliado.afiliado}]`,
      );

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
      comerCodCategoria: Number(categoria.catCodCat),
      comerGarantiaFianza: 1,
      comerModalidadGarantia: 1,
      comerMontoGarFian: 7.77,
      comerModalidadPos: 3,
      comerTipoPos: 1,
      comerRecaudos: null,
      comerDireccion: locationToString(commerce.locationCommerce),
      comerObservaciones: commerce.comerObservaciones || '',
      comerCodAliado: 84,
      comerEstatus: 5,
      comerHorario: null,
      comerImagen: null,
      comerPuntoAdicional: commerce.comerPuntoAdicional || 0,
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

    const comercioSave = await this._commerceRepository.save(newCommerce);
    console.log('listo comercio');
    //Contacto
    const newContacto: Contactos = {
      contCodComer: comercioSave.comerCod,
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

    //Crear comerxafiliado
    let comerXafiSave = await this._comerciosXAfiliado.findOne({
      where: { cxaCodComer: comercioSave?.comerCod },
    });

    if (!comerXafiSave) {
      comerXafiSave = await this._comerciosXAfiliado.save({
        cxaCodAfi: cxaCod,
        cxaCodComer: comercioSave?.comerCod,
      });
      console.log('listo comercioxafilido');
    } else {
      console.log('ComercioXafiliado ya existe', comercioSave?.comerCod);
    }

    //Crear Comision
    const comisionSave = await this._comisionesMilPagos.findOne({
      where: { cmCodComercio: comercioSave?.comerCod },
    });

    console.log('existe comision', comisionSave);

    if (!comisionSave) {
      this.dataSource.query(`
						INSERT INTO [dbo].[ComisionesMilPagos]
							([cmCodComercio] ,[cmPorcentaje])
						VALUES (${comercioSave?.comerCod} ,0)				
        `);
    }

    console.log('listo comisionmilpagos');

    const info = {
      message: `Comerico [${commerce.comerRif}] creado con exito`,
    };

    log.msg = info.message;
    await this.logService.saveLogsToken(log);

    return info;
  }

  async getAfiliadoByCommerce(
    cxaCodComer: number,
  ): Promise<ComerciosXafiliado> {
    return this._comerciosXAfiliado.findOne({
      where: { cxaCodComer },
    });
  }
}

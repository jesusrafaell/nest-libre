import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, getConnection, Repository } from 'typeorm';
import { CommerceDto } from './dto/new-commerce.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { daysToString, locationToString } from 'src/utils/formatString';
import Comercios from 'src/db/models/comercios.entity';
import Contactos from 'src/db/models/contactos.entity';
import ComerciosXafiliado from 'src/db/models/comerciosXafliado.entity';
import ComisionesMilPagos from 'src/db/models/comisionesmilpagos.entity';
import CategoriasXafiliado from 'src/db/models/categoriasXafiliado.entity';
import Afiliados from 'src/db/models/afiliados.entity';

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
    //
    @InjectRepository(CategoriasXafiliado)
    private readonly _categoriasXafiliado: Repository<CategoriasXafiliado>,
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

  async createCommerce(body: CommerceDto): Promise<Resp> {
    const { commerce, contacto } = body;

    //validar si el comercio existe
    if (await this.getCommerce(commerce.comerRif)) {
      throw new BadRequestException(
        `Comercio [${commerce.comerRif}] ya existe`,
      );
    }

    //Validar si el afiliado existe y es de librepago
    // const cxaCodAfi = `${commerce.idActivityXAfiliado}`.split('');
    // while (cxaCodAfi.length < 15) cxaCodAfi.unshift('0');
    // const cxaCod: string = cxaCodAfi.join('');
    const { idActivityXAfiliado: cxaCod } = commerce;
    console.log('numero de afiliado', cxaCod);

    //[3312] MOdifcar el afilaido apra que busque en mi tabla
    const afiliado = await this._afiliadosRepository.findOneById(cxaCod);

    if (!afiliado)
      throw new BadRequestException(
        `No existe el numero de afiliado [${cxaCod}]`,
      );

    const categoria = await this.getCategoriaByAfiliado(afiliado.afiCod);

    if (!categoria)
      throw new BadRequestException(
        `No existe categoria comercial del afiliado [${afiliado.afiCod}]`,
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

    const comercioSave = await this._commerceRepository.save(newCommerce);
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

    const info = {
      message: `Comerico [${commerce.comerRif}] creado con exito`,
    };

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

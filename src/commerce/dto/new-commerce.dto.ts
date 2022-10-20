import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import {
  Max,
  Min,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import error from './messages-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class RifValidation implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const numeros = '0123456789';
    return !(numeros.indexOf(text[0]) != -1);
  }

  defaultMessage() {
    return '$property debe comenzar con una letra Ej:V,J,R';
  }
}

@ValidatorConstraint({ name: 'customRange', async: false })
export class SizeOneOrTwo implements ValidatorConstraintInterface {
  validate(num: number, args: ValidationArguments) {
    return num == 1 || num == 2;
  }

  defaultMessage() {
    return '$property esta fuera de rango debe ser 1 o 2';
  }
}

export class LocationDTO {
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  estado: string;
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  municipio: string;
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  ciudad: string;
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  parroquia: string;
}

class Days {
  @IsNotEmpty(error.textNotEmpty)
  @IsBoolean(error.isBoolean)
  Lun: boolean;
  @IsNotEmpty(error.textNotEmpty)
  @IsBoolean(error.isBoolean)
  Mar: boolean;
  @IsNotEmpty(error.textNotEmpty)
  @IsBoolean(error.isBoolean)
  Mie: boolean;
  @IsNotEmpty(error.textNotEmpty)
  @IsBoolean(error.isBoolean)
  Jue: boolean;
  @IsNotEmpty(error.textNotEmpty)
  @IsBoolean(error.isBoolean)
  Vie: boolean;
  @IsNotEmpty(error.textNotEmpty)
  @IsBoolean(error.isBoolean)
  Sab: boolean;
  @IsNotEmpty(error.textNotEmpty)
  @IsBoolean(error.isBoolean)
  Dom: boolean;
}

class Contact {
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  contNombres: string;
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  contApellidos: string;
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  @IsOptional()
  contTelefLoc: string;
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  contTelefMov: string;
  @IsNotEmpty(error.textNotEmpty)
  contMail: string;
}

class CommerceData {
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  @Length(6, 10, error.textLength)
  @Validate(RifValidation)
  comerRif: string;
  //
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  @Length(15, 15, error.afiliadoLength)
  idActivityXAfiliado: string;
  @IsNotEmpty()
  comerDesc: string;
  @IsNumber()
  @IsNotEmpty(error.textNotEmpty)
  @Validate(SizeOneOrTwo)
  comerTipoPer: number;
  // @Length(4, 4, error.cuentaBanco)
  // comerCodigoBanco: string;
  @Length(20, 20, error.cuentaBanco)
  comerCuentaBanco: string;
  @IsNumber()
  @Validate(SizeOneOrTwo)
  comerCodTipoCont: number;
  comerObservaciones?: string;
  //comerPuntoAdicional?: number;
  //
  @IsString()
  @Length(4, 4, error.cuentaBanco)
  @IsOptional()
  comerCodigoBanco2?: string;
  @IsString()
  @Length(20, 20, error.cuentaBanco)
  @IsOptional()
  comerCuentaBanco2?: string;
  @IsString()
  @Length(4, 4, error.cuentaBanco)
  @IsOptional()
  comerCodigoBanco3?: string;
  @IsString()
  @Length(20, 20, error.cuentaBanco)
  @IsOptional()
  comerCuentaBanco3?: string;
  //
  @ValidateNested()
  @IsObject(error.isObject)
  @IsNotEmptyObject({ nullable: false }, error.isDefined)
  @Type(() => LocationDTO)
  locationCommerce!: LocationDTO;
  @ValidateNested()
  @IsObject(error.isObject)
  @IsNotEmptyObject({ nullable: false }, error.isDefined)
  @Type(() => LocationDTO)
  locationContact!: LocationDTO;
  @ValidateNested()
  @IsObject(error.isObject)
  @IsNotEmptyObject({ nullable: false }, error.isDefined)
  @Type(() => LocationDTO)
  locationPos!: LocationDTO;
  @IsNotEmptyObject({ nullable: false }, error.isDefined)
  @Type(() => Days)
  @ValidateNested()
  daysOperacion: Days;
}

export class CommerceDto {
  //@IsDefined(error.isDefined)
  @IsObject(error.isObject)
  @IsNotEmptyObject({ nullable: false }, error.isDefined)
  @ValidateNested()
  @Type(() => CommerceData)
  commerce!: CommerceData;
  //
  //@IsDefined(error.isDefined)
  @IsObject(error.isObject)
  @IsNotEmptyObject({ nullable: false }, error.isDefined)
  @ValidateNested()
  @Type(() => Contact)
  contacto!: Contact;
}

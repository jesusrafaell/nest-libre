import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Validate,
} from '@nestjs/class-validator';
import { RifValidation } from '../../commerce/dto/new-commerce.dto';
import error from '../../commerce/dto/messages-validator';

export class CreateTerminalsDto {
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  @Length(6, 10, error.textLength)
  @Validate(RifValidation)
  comerRif!: string;

  @IsNumber()
  @IsNotEmpty()
  comerCantPost!: number;
}

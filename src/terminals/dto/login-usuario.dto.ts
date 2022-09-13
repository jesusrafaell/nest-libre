import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Validate,
} from '@nestjs/class-validator';
import { RifValidation } from 'src/commerce/dto/new-commerce.dto';
import error from 'src/commerce/dto/messages-validator';

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

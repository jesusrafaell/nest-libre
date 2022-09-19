import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommerceDto } from './dto/new-commerce.dto';
import { CommerceService, Resp } from './commerce.service';

@UsePipes(ValidationPipe)
@Controller('commerce')
export class CommerceController {
  constructor(private readonly _commerceService: CommerceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createCommerce(@Body() body: CommerceDto): Promise<Resp> {
    //console.log(body);
    return this._commerceService.createCommerce(body);
  }
}

import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Post,
  Headers,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommerceDto } from './dto/new-commerce.dto';
import { CommerceService, Resp } from './commerce.service';
import { Request } from 'express';
import { LogHeader } from '../logs/dto/dto-logs.dto';

@UsePipes(ValidationPipe)
@Controller('commerce')
export class CommerceController {
  constructor(private readonly _commerceService: CommerceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createCommerce(
    @Headers('authorization') token: string,
    @Req() req: Request,
    @Body() body: CommerceDto,
  ): Promise<Resp> {
    const log: LogHeader = {
      token,
      method: req.method,
      path: req.url,
      msg: '',
    };
    return this._commerceService.createCommerce(body, log);
  }
}

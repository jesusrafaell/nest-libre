import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTerminalsDto } from './dto/create-terminals.dto';
import { RespTerm, TerminalsService } from './terminals.service';

@UsePipes(ValidationPipe)
@Controller('terminal')
export class TerminalsController {
  constructor(private readonly TerminalsService: TerminalsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createTerminals(@Body() body: CreateTerminalsDto): Promise<RespTerm> {
    return this.TerminalsService.createTerminals(
      body.comerRif,
      body.comerCantPost,
    );
  }
}

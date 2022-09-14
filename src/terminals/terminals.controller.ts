import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTerminalsDto } from './dto/create-terminals.dto';
import { TerminalsService } from './terminals.service';

@UsePipes(ValidationPipe)
@Controller('terminal')
export class TerminalsController {
  constructor(private readonly TerminalsService: TerminalsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  getUsuario(@Body() body: CreateTerminalsDto) {
    return this.TerminalsService.createTerminals(
      body.comerRif,
      body.comerCantPost,
    );
  }
}

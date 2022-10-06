import { Controller, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { Request } from 'express';
import Usuarios from '../db/models/usuarios.entity';
import { LogHeader } from '../logs/dto/dto-logs.dto';
import { TestApiService } from './TestApi.service';

export interface TestResp {
  message: string;
  user: Usuarios;
}

@UsePipes(ValidationPipe)
@Controller('test')
export class TestApiController {
  constructor(private readonly _testApiService: TestApiService) {}

  @Get('index')
  createCommerce(): Promise<TestResp> {
    return this._testApiService.getUser();
  }
}

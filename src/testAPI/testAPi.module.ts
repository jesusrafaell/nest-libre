import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestApiService } from './TestApi.service';
import { TestApiController } from './testApi.controller';
import Usuarios from '../db/models/usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  controllers: [TestApiController],
  providers: [TestApiService],
  exports: [TestApiService],
})
export class TestApiModule {}

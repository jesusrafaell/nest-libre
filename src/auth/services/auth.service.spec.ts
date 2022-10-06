import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import general_logs_librepago from '../../db/models/general_logs_librepago.entity';
import Perfiles from '../../db/models/perfiles.entity';
import Usuarios from '../../db/models/usuarios.entity';
import { LogsService } from '../../logs/logs.service';
import { UsuariosService } from '../../usuarios/services/usuarios.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let serviceAuth: AuthService;

  // private userService: UsuariosService,
  // private readonly jwtService: JwtService,
  // private readonly logService: LogsService,

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsuariosService,
        JwtService,
        LogsService,
        {
          provide: getRepositoryToken(Usuarios),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Perfiles),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(general_logs_librepago),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    serviceAuth = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(serviceAuth).toBeDefined;
  });
});

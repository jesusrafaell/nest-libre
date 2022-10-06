import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUsuarioDto } from '../../auth/dto/login-usuario.dto';
import Perfiles from '../../db/models/perfiles.entity';
import Usuarios from '../../db/models/usuarios.entity';
import { UsuariosService } from './usuarios.service';

describe('UsuariosService', () => {
  let serviceUsuario: UsuariosService;
  let usuarioRepository: Repository<Usuarios>;
  let perfilRepository: Repository<Perfiles>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
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
      ],
    }).compile();

    serviceUsuario = module.get<UsuariosService>(UsuariosService);
    usuarioRepository = module.get<Repository<Usuarios>>(
      getRepositoryToken(Usuarios),
    );
    perfilRepository = module.get<Repository<Perfiles>>(
      getRepositoryToken(Perfiles),
    );
  });

  it('should be defined', () => {
    expect(serviceUsuario).toBeDefined;
  });

  it('usuarioRepository should be defined', () => {
    expect(usuarioRepository).toBeDefined();
  });

  it('perfilRepository should be defined', () => {
    expect(perfilRepository).toBeDefined();
  });

  describe('getUsuario', () => {
    it('should return a Usuario from DB', async () => {
      const getUsuarioSpy = jest.spyOn(serviceUsuario, 'getUsuario');
      const login: LoginUsuarioDto = {
        login: 'kpolo',
        password: 'cUIdDUd5MxlsgKs0biXIJA==',
      };
      const user = await serviceUsuario.getUsuario(login);
      //console.log(user);
      expect(getUsuarioSpy).toHaveBeenCalledWith(login);
    });
  });

  describe('validatePerfil', () => {
    it('should return if user is valid', async () => {
      const getUsuarioSpy = jest.spyOn(serviceUsuario, 'validatePerfil');
      const usuario: Usuarios = new Usuarios();
      const user = await serviceUsuario.validatePerfil(usuario);
      //console.log(user);
      expect(getUsuarioSpy).toHaveBeenCalledWith({});
    });
  });
});

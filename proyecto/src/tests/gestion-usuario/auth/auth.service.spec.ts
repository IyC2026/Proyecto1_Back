import { BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/modules/gestion-usuario/auth/application/services/auth.service';
import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

const mockJwtService = { sign: jest.fn().mockReturnValue('token123') };
const mockConfigService = { get: jest.fn().mockReturnValue('60s') };
const mockUsuarioService = {
  findByMail: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService(
      mockJwtService as any,
      mockUsuarioService as any,
      mockConfigService as any,
    );
  });

  // ─── registrarUsuario ───────────────────────────────────────────────────────

  describe('registrarUsuario', () => {
    it('hashea la contraseña y llama a usuarioService.create', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
      mockUsuarioService.create.mockResolvedValue({ id: 1, mail: 'a@b.com' });

      const dto = { mail: 'a@b.com', contrasena: '123456', rolId: 1, denominacion: 'Test' };
      const result = await service.registrarUsuario(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
      expect(mockUsuarioService.create).toHaveBeenCalled();
      expect(result).toEqual({ id: 1, mail: 'a@b.com' });
    });
  });

  // ─── login ──────────────────────────────────────────────────────────────────

  describe('login', () => {
    const usuarioMock = {
      id: 1,
      mail: 'a@b.com',
      contrasena: 'hashed',
      personalId: 5,
      roles: [{ id: 2 }],
    };

    it('lanza UnauthorizedException si el usuario no existe', async () => {
      mockUsuarioService.findByMail.mockResolvedValue(null);
      await expect(
        service.login({ mail: 'x@x.com', contrasena: '123', empresaId: 1 }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('lanza UnauthorizedException si la contraseña es incorrecta', async () => {
      mockUsuarioService.findByMail.mockResolvedValue(usuarioMock);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(
        service.login({ mail: 'a@b.com', contrasena: 'wrong', empresaId: 1 }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('retorna accessToken y refreshToken con credenciales válidas', async () => {
      mockUsuarioService.findByMail.mockResolvedValue(usuarioMock);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login({ mail: 'a@b.com', contrasena: '123456', empresaId: 1 });

      expect(result.accessToken).toBe('token123');
      expect(result.refreshToken).toBe('token123');
      expect(result.usuario).toEqual(usuarioMock);
    });

    it('genera el payload con sub, personalId, roles y empresaId', async () => {
      mockUsuarioService.findByMail.mockResolvedValue(usuarioMock);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await service.login({ mail: 'a@b.com', contrasena: '123456', empresaId: 7 });

      expect(mockJwtService.sign).toHaveBeenCalledWith(
        expect.objectContaining({ sub: 1, personalId: 5, roles: [2], empresaId: 7 }),
        expect.any(Object),
      );
    });
  });

  // ─── verificarCodigo ────────────────────────────────────────────────────────

  describe('verificarCodigo', () => {
    it('lanza BadRequestException si el usuario no existe', async () => {
      mockUsuarioService.findByMail.mockResolvedValue(null);
      await expect(
        service.verificarCodigo({ mail: 'x@x.com', codigo: '123456' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('lanza BadRequestException si el código no coincide', async () => {
      mockUsuarioService.findByMail.mockResolvedValue({
        codigoRecuperacion: '999999',
        codigoExpira: new Date(Date.now() + 60000),
      });
      await expect(
        service.verificarCodigo({ mail: 'a@b.com', codigo: '123456' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('lanza BadRequestException si el código expiró', async () => {
      mockUsuarioService.findByMail.mockResolvedValue({
        codigoRecuperacion: '123456',
        codigoExpira: new Date(Date.now() - 1000),
      });
      await expect(
        service.verificarCodigo({ mail: 'a@b.com', codigo: '123456' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('retorna true con código válido y no expirado', async () => {
      mockUsuarioService.findByMail.mockResolvedValue({
        codigoRecuperacion: '123456',
        codigoExpira: new Date(Date.now() + 60000),
      });
      const result = await service.verificarCodigo({ mail: 'a@b.com', codigo: '123456' });
      expect(result).toBe(true);
    });
  });

  // ─── cambiarContrasena ──────────────────────────────────────────────────────

  describe('cambiarContrasena', () => {
    it('lanza BadRequestException si el usuario no existe', async () => {
      mockUsuarioService.findByMail.mockResolvedValue(null);
      await expect(
        service.cambiarContrasena({ mail: 'x@x.com', nuevaContrasena: 'nueva' }),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('hashea la nueva contraseña y guarda el usuario', async () => {
      const usuario = { mail: 'a@b.com', contrasena: 'old' };
      mockUsuarioService.findByMail.mockResolvedValue(usuario);
      (bcrypt.hash as jest.Mock).mockResolvedValue('newHashed');
      mockUsuarioService.save.mockResolvedValue(undefined);

      const result = await service.cambiarContrasena({ mail: 'a@b.com', nuevaContrasena: 'nueva123' });

      expect(bcrypt.hash).toHaveBeenCalledWith('nueva123', 10);
      expect(usuario.contrasena).toBe('newHashed');
      expect(result).toBe('Contraseña actualizada correctamente.');
    });
  });

  // ─── enviarCodigoRecuperacion ───────────────────────────────────────────────

  describe('enviarCodigoRecuperacion', () => {
    it('lanza UnauthorizedException si el mail no está registrado', async () => {
      mockUsuarioService.findByMail.mockResolvedValue(null);
      await expect(
        service.enviarCodigoRecuperacion({ mail: 'noexiste@x.com' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});

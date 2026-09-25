import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

const mockRepository = {
  findOne: jest.fn(),
  findByMail: jest.fn(),
  findBy: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
  save: jest.fn(),
  updateDatos: jest.fn(),
  updateContrasena: jest.fn(),
  findByMailFiltered: jest.fn(),
  createUsuarioFor: jest.fn(),
};

const mockRolService = {
  findOne: jest.fn(),
  findByIds: jest.fn(),
};

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UsuarioService(mockRepository as any, mockRolService as any);
  });

  // ─── findOne ────────────────────────────────────────────────────────────────

  describe('findOne', () => {
    it('retorna el usuario si existe', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1 });
      const result = await service.findOne(1);
      expect(result).toEqual({ id: 1 });
    });

    it('lanza NotFoundException si no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  // ─── findByMail ─────────────────────────────────────────────────────────────

  describe('findByMail', () => {
    it('retorna null si no encuentra el mail', async () => {
      mockRepository.findByMail.mockResolvedValue(null);
      const result = await service.findByMail('no@existe.com');
      expect(result).toBeNull();
    });

    it('retorna el usuario si encuentra el mail', async () => {
      mockRepository.findByMail.mockResolvedValue({ id: 1, mail: 'a@b.com' });
      const result = await service.findByMail('a@b.com');
      expect(result).toEqual({ id: 1, mail: 'a@b.com' });
    });
  });

  // ─── checkByMail ────────────────────────────────────────────────────────────

  describe('checkByMail', () => {
    it('lanza ConflictException si el mail ya está en uso por otro usuario', async () => {
      mockRepository.findByMail.mockResolvedValue({ id: 2, mail: 'a@b.com' });
      await expect(service.checkByMail('a@b.com', 1)).rejects.toThrow(ConflictException);
    });

    it('no lanza si el mail pertenece al mismo usuario', async () => {
      mockRepository.findByMail.mockResolvedValue({ id: 1, mail: 'a@b.com' });
      await expect(service.checkByMail('a@b.com', 1)).resolves.not.toThrow();
    });
  });

  // ─── create ─────────────────────────────────────────────────────────────────

  describe('create', () => {
    it('lanza ConflictException si el mail ya existe', async () => {
      mockRepository.findByMail.mockResolvedValue({ id: 2 });
      await expect(
        service.create({ mail: 'a@b.com', contrasena: '123', rolId: 1, denominacion: 'Test' }),
      ).rejects.toThrow(ConflictException);
    });

    it('lanza NotFoundException si el rol no existe', async () => {
      mockRepository.findByMail.mockResolvedValue(null);
      mockRolService.findOne.mockRejectedValue(new NotFoundException('Rol no encontrado'));
      await expect(
        service.create({ mail: 'nuevo@b.com', contrasena: '123', rolId: 99, denominacion: 'Test' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('crea el usuario correctamente', async () => {
      mockRepository.findByMail.mockResolvedValue(null);
      mockRolService.findOne.mockResolvedValue({ id: 1 });
      mockRepository.create.mockResolvedValue({ id: 1, mail: 'nuevo@b.com' });

      const result = await service.create({
        mail: 'nuevo@b.com',
        contrasena: '123',
        rolId: 1,
        denominacion: 'Test',
      });
      expect(result).toEqual({ id: 1, mail: 'nuevo@b.com' });
    });
  });

  // ─── updateDatos ────────────────────────────────────────────────────────────

  describe('updateDatos', () => {
    it('lanza NotFoundException si el usuario no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.updateDatos(99, { mail: 'x@x.com' })).rejects.toThrow(NotFoundException);
    });

    it('lanza ConflictException si el nuevo mail ya está en uso', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, mail: 'viejo@b.com', roles: [] });
      mockRepository.findByMail.mockResolvedValue({ id: 2, mail: 'nuevo@b.com' });
      await expect(service.updateDatos(1, { mail: 'nuevo@b.com' })).rejects.toThrow(ConflictException);
    });

    it('lanza BadRequestException si rolesIds está vacío', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, mail: 'a@b.com', roles: [] });
      mockRepository.findByMail.mockResolvedValue(null);
      await expect(service.updateDatos(1, { rolesIds: [] })).rejects.toThrow(BadRequestException);
    });

    it('actualiza datos correctamente', async () => {
      const usuario = { id: 1, mail: 'a@b.com', denominacion: 'Viejo', roles: [] };
      mockRepository.findOne.mockResolvedValue(usuario);
      mockRepository.findByMail.mockResolvedValue(null);
      mockRolService.findByIds.mockResolvedValue([{ id: 2 }]);
      mockRepository.updateDatos.mockResolvedValue(undefined);

      await service.updateDatos(1, { mail: 'nuevo@b.com', denominacion: 'Nuevo', rolesIds: [2] });

      expect(usuario.mail).toBe('nuevo@b.com');
      expect(usuario.denominacion).toBe('Nuevo');
    });
  });

  // ─── updateContrasena ───────────────────────────────────────────────────────

  describe('updateContrasena', () => {
    it('lanza BadRequestException si las contraseñas nuevas no coinciden', async () => {
      await expect(
        service.updateContrasena(1, {
          contrasenaActual: 'actual',
          contrasenaNueva: 'nueva1',
          confirmarContrasena: 'nueva2',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('lanza NotFoundException si el usuario no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(
        service.updateContrasena(99, {
          contrasenaActual: 'actual',
          contrasenaNueva: 'nueva',
          confirmarContrasena: 'nueva',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('lanza UnauthorizedException si la contraseña actual es incorrecta', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, contrasena: 'hashed' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(
        service.updateContrasena(1, {
          contrasenaActual: 'incorrecta',
          contrasenaNueva: 'nueva',
          confirmarContrasena: 'nueva',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('actualiza la contraseña correctamente', async () => {
      const usuario = { id: 1, contrasena: 'hashed' };
      mockRepository.findOne.mockResolvedValue(usuario);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('newHashed');
      mockRepository.updateContrasena.mockResolvedValue(undefined);

      await service.updateContrasena(1, {
        contrasenaActual: 'actual',
        contrasenaNueva: 'nueva',
        confirmarContrasena: 'nueva',
      });

      expect(usuario.contrasena).toBe('newHashed');
      expect(mockRepository.updateContrasena).toHaveBeenCalledWith(usuario);
    });
  });

  // ─── remove ─────────────────────────────────────────────────────────────────

  describe('remove', () => {
    it('lanza NotFoundException si el usuario no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });

    it('elimina el usuario correctamente', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1 });
      mockRepository.remove.mockResolvedValue(undefined);
      await service.remove(1);
      expect(mockRepository.remove).toHaveBeenCalledWith(1);
    });
  });
});

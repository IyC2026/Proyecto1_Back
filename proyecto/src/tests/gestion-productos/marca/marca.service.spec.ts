import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { MarcaService } from 'src/modules/gestion-productos/marca/application/services/marca.service';

const mockRepository = {
  findOne: jest.fn(),
  findAllFor: jest.fn(),
  findAllListado: jest.fn(),
  findAllSinSistemaFor: jest.fn(),
  findAllSistemaFor: jest.fn(),
  findBy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  findByDenominacionWith: jest.fn(),
  findByIdConAuditoria: jest.fn(),
};

const mockUsuarioService = { findOne: jest.fn() };
const mockPoliticaEliminacion = { tieneProductosActivosParaMarca: jest.fn() };

describe('MarcaService', () => {
  let service: MarcaService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new MarcaService(
      mockRepository as any,
      mockUsuarioService as any,
      mockPoliticaEliminacion as any,
    );
  });

  describe('create', () => {
    it('lanza ConflictException si la denominación ya existe', async () => {
      mockRepository.findByDenominacionWith.mockResolvedValue({ id: 1 });
      await expect(service.create({ denominacion: 'Nike' })).rejects.toThrow(ConflictException);
    });

    it('crea la marca correctamente', async () => {
      mockRepository.findByDenominacionWith.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue({ id: 1, denominacion: 'Nike' });
      const result = await service.create({ denominacion: 'Nike' });
      expect(result.mensaje).toContain('Nike');
    });
  });

  describe('update', () => {
    it('lanza NotFoundException si la marca no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.update(99, { denominacion: 'X' })).rejects.toThrow(NotFoundException);
    });

    it('lanza ForbiddenException si la marca es del sistema', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 1 });
      await expect(service.update(1, { denominacion: 'X' })).rejects.toThrow(ForbiddenException);
    });

    it('lanza ConflictException si la nueva denominación ya está en uso', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 0 });
      mockRepository.findByDenominacionWith.mockResolvedValue({ id: 2 });
      await expect(service.update(1, { denominacion: 'Adidas' })).rejects.toThrow(ConflictException);
    });

    it('actualiza correctamente', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 0 });
      mockRepository.findByDenominacionWith.mockResolvedValue(null);
      mockRepository.update.mockResolvedValue({ id: 1, denominacion: 'Editada' });
      const result = await service.update(1, { denominacion: 'Editada' });
      expect(result.mensaje).toContain('Editada');
    });
  });

  describe('remove', () => {
    it('lanza NotFoundException si la marca no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(99, 1)).rejects.toThrow(NotFoundException);
    });

    it('lanza ForbiddenException si la marca es del sistema', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 1 });
      await expect(service.remove(1, 1)).rejects.toThrow(ForbiddenException);
    });

    it('lanza ConflictException si tiene productos activos', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 0 });
      mockPoliticaEliminacion.tieneProductosActivosParaMarca.mockResolvedValue(true);
      await expect(service.remove(1, 1)).rejects.toThrow(ConflictException);
    });

    it('elimina correctamente si no tiene productos activos', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 0, denominacion: 'Nike' });
      mockPoliticaEliminacion.tieneProductosActivosParaMarca.mockResolvedValue(false);
      mockUsuarioService.findOne.mockResolvedValue({ id: 1 });
      mockRepository.remove.mockResolvedValue(undefined);
      const result = await service.remove(1, 1);
      expect(result.mensaje).toContain('Nike');
    });
  });

  describe('findEntityById', () => {
    it('lanza NotFoundException si no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findEntityById(99)).rejects.toThrow(NotFoundException);
    });

    it('retorna la entidad si existe', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1 });
      const result = await service.findEntityById(1);
      expect(result).toEqual({ id: 1 });
    });
  });
});

import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { LineaService } from 'src/modules/gestion-productos/linea/application/services/linea.service';

const mockRepository = {
  findOne: jest.fn(),
  findAllFor: jest.fn(),
  findAllListado: jest.fn(),
  findByDenominacionFiltered: jest.fn(),
  findByDenominacionWith: jest.fn(),
  findByIdConAuditoria: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockPoliticaEliminacion = { tieneProductosActivosParaLinea: jest.fn() };
const mockUsuarioService = { findOne: jest.fn() };

describe('LineaService', () => {
  let service: LineaService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new LineaService(
      mockRepository as any,
      mockPoliticaEliminacion as any,
      mockUsuarioService as any,
    );
  });

  describe('create', () => {
    it('lanza ConflictException si la denominación ya existe', async () => {
      mockRepository.findByDenominacionWith.mockResolvedValue({ id: 1 });
      await expect(service.create({ denominacion: 'Electrónica' })).rejects.toThrow(ConflictException);
    });

    it('crea la línea correctamente', async () => {
      mockRepository.findByDenominacionWith.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue({ id: 1, denominacion: 'Electrónica' });
      const result = await service.create({ denominacion: 'Electrónica' });
      expect(result.mensaje).toContain('Electrónica');
    });
  });

  describe('update', () => {
    it('lanza NotFoundException si la línea no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.update(99, { denominacion: 'X' })).rejects.toThrow(NotFoundException);
    });

    it('lanza ForbiddenException si la línea es del sistema', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 1 });
      await expect(service.update(1, { denominacion: 'X' })).rejects.toThrow(ForbiddenException);
    });

    it('lanza ConflictException si la denominación ya está en uso', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 0 });
      mockRepository.findByDenominacionWith.mockResolvedValue({ id: 2 });
      await expect(service.update(1, { denominacion: 'Ropa' })).rejects.toThrow(ConflictException);
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
    it('lanza NotFoundException si la línea no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(99, 1)).rejects.toThrow(NotFoundException);
    });

    it('lanza ForbiddenException si la línea es del sistema', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 1 });
      await expect(service.remove(1, 1)).rejects.toThrow(ForbiddenException);
    });

    it('lanza ConflictException si tiene productos activos', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 0 });
      mockUsuarioService.findOne.mockResolvedValue({ id: 1 });
      mockPoliticaEliminacion.tieneProductosActivosParaLinea.mockResolvedValue(true);
      await expect(service.remove(1, 1)).rejects.toThrow(ConflictException);
    });

    it('elimina correctamente si no tiene productos activos', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 0, denominacion: 'Electrónica' });
      mockUsuarioService.findOne.mockResolvedValue({ id: 1 });
      mockPoliticaEliminacion.tieneProductosActivosParaLinea.mockResolvedValue(false);
      mockRepository.remove.mockResolvedValue(undefined);
      const result = await service.remove(1, 1);
      expect(result.mensaje).toContain('Electrónica');
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

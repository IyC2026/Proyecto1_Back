import { ConflictException, NotFoundException } from '@nestjs/common';
import { RolService } from 'src/modules/gestion-usuario/rol/application/services/rol.service';

const mockRepository = {
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  findByDenominacion: jest.fn(),
  findByDenominacionFiltered: jest.fn(),
  findByIds: jest.fn(),
};

describe('RolService', () => {
  let service: RolService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new RolService(mockRepository as any);
  });

  describe('create', () => {
    it('lanza ConflictException si la denominación ya existe', async () => {
      mockRepository.findByDenominacion.mockResolvedValue({ id: 1, denominacion: 'Admin' });
      await expect(service.create({ denominacion: 'Admin' } as any)).rejects.toThrow(ConflictException);
    });

    it('crea el rol si la denominación es única', async () => {
      mockRepository.findByDenominacion.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue({ id: 1, denominacion: 'Nuevo' });
      const result = await service.create({ denominacion: 'Nuevo' } as any);
      expect(result).toEqual({ id: 1, denominacion: 'Nuevo' });
    });
  });

  describe('update', () => {
    it('lanza NotFoundException si el rol no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.update(99, { denominacion: 'X' } as any)).rejects.toThrow(NotFoundException);
    });

    it('lanza ConflictException si la nueva denominación ya está en uso', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1 });
      mockRepository.findByDenominacion.mockResolvedValue({ id: 2, denominacion: 'Admin' });
      await expect(service.update(1, { denominacion: 'Admin' } as any)).rejects.toThrow(ConflictException);
    });

    it('actualiza correctamente', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1 });
      mockRepository.findByDenominacion.mockResolvedValue(null);
      mockRepository.update.mockResolvedValue({ id: 1, denominacion: 'Editado' });
      const result = await service.update(1, { denominacion: 'Editado' } as any);
      expect(result).toEqual({ id: 1, denominacion: 'Editado' });
    });
  });

  describe('findOne', () => {
    it('lanza NotFoundException si no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });

    it('retorna el rol si existe', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1 });
      const result = await service.findOne(1);
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('remove', () => {
    it('lanza NotFoundException si no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });

    it('elimina correctamente', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1 });
      mockRepository.remove.mockResolvedValue(undefined);
      await service.remove(1);
      expect(mockRepository.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('findByIds', () => {
    it('lanza NotFoundException si algún rol no existe', async () => {
      mockRepository.findByIds.mockResolvedValue([{ id: 1 }]);
      await expect(service.findByIds([1, 2])).rejects.toThrow(NotFoundException);
    });

    it('retorna todos los roles si todos existen', async () => {
      mockRepository.findByIds.mockResolvedValue([{ id: 1 }, { id: 2 }]);
      const result = await service.findByIds([1, 2]);
      expect(result).toHaveLength(2);
    });
  });
});

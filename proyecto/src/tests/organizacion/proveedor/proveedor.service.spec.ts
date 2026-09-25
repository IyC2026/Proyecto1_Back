import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProveedorService } from 'src/modules/organizacion/proveedor/application/services/proveedor.service';

const mockRepository = {
  findOne: jest.fn(),
  findBy: jest.fn(),
  findAllByDenominacion: jest.fn(),
  findAllByTipo: jest.fn(),
  findByDenominacion: jest.fn(),
  findByIdConAuditoria: jest.fn(),
  findAllFor: jest.fn(),
  findAllSistemaFor: jest.fn(),
  findAllSinSistemaFor: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockCondicionIvaService = { findEntityById: jest.fn(), findAllSinConsumidorFinal: jest.fn() };
const mockLocalidadService = { findEntityById: jest.fn(), findAllFor: jest.fn(), findAllForProvincia: jest.fn() };
const mockProvinciaService = { findAllFor: jest.fn() };
const mockUsuarioService = { findOne: jest.fn() };
const mockValidator = {
  validateCreateProveedor: jest.fn(),
  validateUpdateProveedor: jest.fn(),
};

describe('ProveedorService', () => {
  let service: ProveedorService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProveedorService(
      mockRepository as any,
      mockCondicionIvaService as any,
      mockLocalidadService as any,
      mockProvinciaService as any,
      mockUsuarioService as any,
      mockValidator as any,
    );
  });

  describe('create', () => {
    it('lanza NotFoundException si la localidad no existe', async () => {
      mockValidator.validateCreateProveedor.mockResolvedValue({
        usuario: { id: 1 },
        categoriaIVA: { id: 1 },
      });
      mockLocalidadService.findEntityById.mockResolvedValue(null);

      await expect(
        service.create({ denominacion: 'Proveedor Test', domicilio: { localidadId: 99 } } as any),
      ).rejects.toThrow(NotFoundException);
    });

    it('crea el proveedor correctamente', async () => {
      mockValidator.validateCreateProveedor.mockResolvedValue({
        usuario: { id: 1 },
        categoriaIVA: { id: 1 },
      });
      mockLocalidadService.findEntityById.mockResolvedValue({ id: 1 });
      mockRepository.create.mockResolvedValue({ id: 1, denominacion: 'Proveedor Test' });

      const result = await service.create({
        denominacion: 'Proveedor Test',
        domicilio: { localidadId: 1 },
      } as any);

      expect(result.mensaje).toContain('Proveedor Test');
    });
  });

  describe('update', () => {
    it('lanza BadRequestException si no viene localidadId', async () => {
      mockValidator.validateUpdateProveedor.mockResolvedValue({
        usuario: { id: 1 },
        categoriaIVA: { id: 1 },
      });

      await expect(
        service.update(1, { denominacion: 'X', domicilio: {} } as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('lanza NotFoundException si la localidad no existe en update', async () => {
      mockValidator.validateUpdateProveedor.mockResolvedValue({
        usuario: { id: 1 },
        categoriaIVA: { id: 1 },
      });
      mockLocalidadService.findEntityById.mockResolvedValue(null);

      await expect(
        service.update(1, { denominacion: 'X', domicilio: { localidadId: 99 } } as any),
      ).rejects.toThrow(NotFoundException);
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

  describe('remove', () => {
    it('lanza NotFoundException si el proveedor no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(99, 1)).rejects.toThrow(NotFoundException);
    });

    it('elimina correctamente', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, denominacion: 'Proveedor Test' });
      mockUsuarioService.findOne.mockResolvedValue({ id: 1 });
      mockRepository.remove.mockResolvedValue(undefined);
      const result = await service.remove(1, 1);
      expect(result.mensaje).toContain('Proveedor Test');
    });
  });

  describe('findByIdConAuditoria', () => {
    it('lanza NotFoundException si no existe', async () => {
      mockRepository.findByIdConAuditoria.mockResolvedValue(null);
      await expect(service.findByIdConAuditoria(99)).rejects.toThrow(NotFoundException);
    });
  });
});

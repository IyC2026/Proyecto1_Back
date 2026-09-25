import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ClienteService } from 'src/modules/organizacion/cliente/application/services/cliente.service';

const mockRepository = {
  findOne: jest.fn(),
  findOneWithRelations: jest.fn(),
  findBy: jest.fn(),
  findAllByDenominacion: jest.fn(),
  findAllByDenominacionAndCodigo: jest.fn(),
  findByDenominacion: jest.fn(),
  findByIdConAuditoria: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockCondicionIvaService = { findEntityById: jest.fn(), findAllFor: jest.fn() };
const mockLocalidadService = { findEntityById: jest.fn(), findAllFor: jest.fn(), findAllForProvincia: jest.fn() };
const mockProvinciaService = { findAllFor: jest.fn() };
const mockPersonalService = { findAllVendedorByDenominacion: jest.fn() };
const mockUsuarioService = { findOne: jest.fn() };
const mockEmpresaService = {};
const mockValidator = {
  validateCreateCliente: jest.fn(),
  validateUpdateCliente: jest.fn(),
};

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ClienteService(
      mockRepository as any,
      mockCondicionIvaService as any,
      mockLocalidadService as any,
      mockProvinciaService as any,
      mockPersonalService as any,
      mockUsuarioService as any,
      mockEmpresaService as any,
      mockValidator as any,
    );
  });

  describe('create', () => {
    it('lanza NotFoundException si la localidad no existe', async () => {
      mockValidator.validateCreateCliente.mockResolvedValue({
        usuario: { id: 1 },
        categoriaIVA: { id: 1 },
        personal: null,
      });
      mockLocalidadService.findEntityById.mockResolvedValue(null);

      await expect(
        service.create({
          denominacion: 'Cliente Test',
          domicilio: { localidadId: 99 },
        } as any),
      ).rejects.toThrow(NotFoundException);
    });

    it('crea el cliente correctamente', async () => {
      mockValidator.validateCreateCliente.mockResolvedValue({
        usuario: { id: 1 },
        categoriaIVA: { id: 1 },
        personal: null,
      });
      mockLocalidadService.findEntityById.mockResolvedValue({ id: 1 });
      mockRepository.create.mockResolvedValue({ id: 1, denominacion: 'Cliente Test' });

      const result = await service.create({
        denominacion: 'Cliente Test',
        domicilio: { localidadId: 1 },
      } as any);

      expect(result.mensaje).toContain('Cliente Test');
    });
  });

  describe('update', () => {
    it('lanza BadRequestException si no viene localidadId', async () => {
      mockValidator.validateUpdateCliente.mockResolvedValue({
        usuario: { id: 1 },
        categoriaIVA: { id: 1 },
        personal: null,
      });

      await expect(
        service.update(1, { denominacion: 'X', domicilio: {} } as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('lanza NotFoundException si la localidad no existe en update', async () => {
      mockValidator.validateUpdateCliente.mockResolvedValue({
        usuario: { id: 1 },
        categoriaIVA: { id: 1 },
        personal: null,
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
    it('lanza NotFoundException si el cliente no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(99, 1)).rejects.toThrow(NotFoundException);
    });

    it('elimina correctamente', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, denominacion: 'Cliente Test' });
      mockUsuarioService.findOne.mockResolvedValue({ id: 1 });
      mockRepository.remove.mockResolvedValue(undefined);
      const result = await service.remove(1, 1);
      expect(result.mensaje).toContain('Cliente Test');
    });
  });

  describe('findByIdConAuditoria', () => {
    it('lanza NotFoundException si no existe', async () => {
      mockRepository.findByIdConAuditoria.mockResolvedValue(null);
      await expect(service.findByIdConAuditoria(99)).rejects.toThrow(NotFoundException);
    });
  });
});

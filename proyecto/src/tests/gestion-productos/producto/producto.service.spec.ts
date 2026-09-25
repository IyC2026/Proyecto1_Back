import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ProductoService } from 'src/modules/gestion-productos/producto/application/services/producto.service';

const mockRepository = {
  findOne: jest.fn(),
  findBy: jest.fn(),
  findByRapido: jest.fn(),
  findByIds: jest.fn(),
  findByIdConAuditoria: jest.fn(),
  findByDenominacionCodigoProveedorFiltered: jest.fn(),
  existsProductosActivosByMarca: jest.fn(),
  existsProductosActivosByLinea: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  updateEntity: jest.fn(),
};

const mockLineaService = { findEntityById: jest.fn(), findAllFor: jest.fn() };
const mockMarcaService = { findEntityById: jest.fn(), findAllFor: jest.fn() };
const mockProveedorService = {};
const mockUsuarioService = { findOne: jest.fn() };
const mockIntrinsicValidation = { validarDatosBasicos: jest.fn() };
const mockValidationService = { validarEntidadesRelacionadas: jest.fn() };
const mockRelatedEntitiesValidator = { validarYObtenerEntidadesRelacionadas: jest.fn() };
const mockUniquenessValidator = {
  validarDenominacionUnica: jest.fn(),
  validarCodigoProveedorUnico: jest.fn(),
};
const mockUsuarioValidator = { validarUsuarioExiste: jest.fn() };
const mockDeletePolicy = {};

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProductoService(
      mockRepository as any,
      mockLineaService as any,
      mockMarcaService as any,
      mockProveedorService as any,
      mockUsuarioService as any,
      mockIntrinsicValidation as any,
      mockValidationService as any,
      mockRelatedEntitiesValidator as any,
      mockUniquenessValidator as any,
      mockUsuarioValidator as any,
      mockDeletePolicy as any,
    );
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

  describe('findDtoById', () => {
    it('lanza NotFoundException si no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findDtoById(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('lanza NotFoundException si el producto no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(99, 1)).rejects.toThrow(NotFoundException);
    });

    it('lanza ForbiddenException si el producto es del sistema', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 1, denominacion: 'Test' });
      await expect(service.remove(1, 1)).rejects.toThrow(ForbiddenException);
    });

    it('elimina correctamente', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1, sistema: 0, denominacion: 'Laptop' });
      mockUsuarioService.findOne.mockResolvedValue({ id: 1 });
      mockRepository.remove.mockResolvedValue(undefined);
      const result = await service.remove(1, 1);
      expect(result.mensaje).toContain('Laptop');
    });
  });

  describe('incrementarStock / decrementarStock', () => {
    const mockUow = {};

    it('lanza Error si el producto no existe al incrementar stock', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.incrementarStock(mockUow as any, 99, 5)).rejects.toThrow(
        /no encontrado/,
      );
    });

    it('incrementa el stock correctamente', async () => {
      const producto = { id: 1, stock: 10 };
      mockRepository.findOne.mockResolvedValue(producto);
      mockRepository.updateEntity.mockResolvedValue(undefined);

      const nuevoStock = await service.incrementarStock(mockUow as any, 1, 5);

      expect(nuevoStock).toBe(15);
      expect(producto.stock).toBe(15);
    });

    it('decrementa el stock correctamente', async () => {
      const producto = { id: 1, stock: 10 };
      mockRepository.findOne.mockResolvedValue(producto);
      mockRepository.updateEntity.mockResolvedValue(undefined);

      const nuevoStock = await service.decrementarStock(mockUow as any, 1, 3);

      expect(nuevoStock).toBe(7);
      expect(producto.stock).toBe(7);
    });

    it('stock parte de 0 si es null', async () => {
      const producto = { id: 1, stock: null };
      mockRepository.findOne.mockResolvedValue(producto);
      mockRepository.updateEntity.mockResolvedValue(undefined);

      const nuevoStock = await service.incrementarStock(mockUow as any, 1, 10);
      expect(nuevoStock).toBe(10);
    });
  });

  describe('existsProductosActivosByMarca', () => {
    it('retorna true si existen productos activos', async () => {
      mockRepository.existsProductosActivosByMarca.mockResolvedValue(true);
      const result = await service.existsProductosActivosByMarca(1);
      expect(result).toBe(true);
    });

    it('retorna false si no existen productos activos', async () => {
      mockRepository.existsProductosActivosByMarca.mockResolvedValue(false);
      const result = await service.existsProductosActivosByMarca(1);
      expect(result).toBe(false);
    });
  });

  describe('existsProductosActivosByLinea', () => {
    it('retorna true si existen productos activos', async () => {
      mockRepository.existsProductosActivosByLinea.mockResolvedValue(true);
      const result = await service.existsProductosActivosByLinea(1);
      expect(result).toBe(true);
    });
  });
});

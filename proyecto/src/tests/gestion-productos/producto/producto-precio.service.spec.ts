import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductoPrecioService } from 'src/modules/gestion-productos/producto/application/services/producto-precio.service';

const mockProductoRepository = { findOne: jest.fn() };
const mockHistorialRepository = { find: jest.fn() };
const mockDataSource = { createQueryRunner: jest.fn() };

describe('ProductoPrecioService', () => {
  let service: ProductoPrecioService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProductoPrecioService(
      mockDataSource as any,
      mockProductoRepository as any,
      mockHistorialRepository as any,
    );
  });

  const paramsBase = {
    productoId: 1,
    precioAnterior: 100,
    precioNuevo: 150,
    motivo: 'Ajuste inflación',
    usuarioId: 1,
  };

  describe('registerPriceChange - reglas de negocio', () => {
    it('lanza BadRequestException si precioNuevo <= 0', async () => {
      await expect(
        service.registerPriceChange({ ...paramsBase, precioNuevo: 0 }),
      ).rejects.toThrow(BadRequestException);
    });

    it('lanza BadRequestException si precioNuevo es negativo', async () => {
      await expect(
        service.registerPriceChange({ ...paramsBase, precioNuevo: -50 }),
      ).rejects.toThrow(BadRequestException);
    });

    it('lanza BadRequestException si el motivo está vacío', async () => {
      await expect(
        service.registerPriceChange({ ...paramsBase, motivo: '' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('lanza BadRequestException si el motivo es solo espacios', async () => {
      await expect(
        service.registerPriceChange({ ...paramsBase, motivo: '   ' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('lanza NotFoundException si el producto no existe', async () => {
      mockProductoRepository.findOne.mockResolvedValue(null);
      await expect(
        service.registerPriceChange(paramsBase),
      ).rejects.toThrow(NotFoundException);
    });

    it('registra el cambio de precio correctamente con manager externo', async () => {
      const producto = { id: 1, precio: 100 };
      const historialGuardado = { id: 1, precioNuevo: 150 };

      const mockManager = {
        findOne: jest.fn().mockResolvedValue(producto),
        save: jest.fn()
          .mockResolvedValueOnce(producto)
          .mockResolvedValueOnce(historialGuardado),
      };

      const result = await service.registerPriceChange(paramsBase, mockManager as any);

      expect(mockManager.save).toHaveBeenCalledTimes(2);
      expect(result).toEqual(historialGuardado);
    });
  });

  describe('getHistorial', () => {
    it('retorna el historial de precios de un producto', async () => {
      const historial = [{ id: 1, precioNuevo: 150 }];
      mockHistorialRepository.find.mockResolvedValue(historial);
      const result = await service.getHistorial(1);
      expect(result).toEqual(historial);
      expect(mockHistorialRepository.find).toHaveBeenCalledWith({
        where: { productoId: 1 },
        order: { fecha: 'DESC' },
        relations: ['usuario'],
      });
    });
  });
});

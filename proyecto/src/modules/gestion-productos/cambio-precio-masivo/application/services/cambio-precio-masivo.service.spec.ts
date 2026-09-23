import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { ProductoPrecioService } from '../../../producto/application/services/producto-precio.service';
import { CambioPrecioMasivoService } from './cambio-precio-masivo.service';

describe('CambioPrecioMasivoService', () => {
  let service: CambioPrecioMasivoService;
  let productoPrecioService: jest.Mocked<ProductoPrecioService>;
  let dataSource: { createQueryRunner: jest.Mock };
  let repository: { findByIds: jest.Mock; actualizarPrecio: jest.Mock };

  const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      save: jest.fn(),
      findOne: jest.fn(),
    },
  };

  beforeEach(async () => {
    dataSource = {
      createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
    };
    repository = {
      findByIds: jest.fn(),
      actualizarPrecio: jest.fn(),
    };

    productoPrecioService = {
      registerPriceChange: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CambioPrecioMasivoService,
        {
          provide: 'ICambioPrecioMasivoRepository',
          useValue: repository,
        },
        {
          provide: ProductoPrecioService,
          useValue: productoPrecioService,
        },
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    service = module.get<CambioPrecioMasivoService>(CambioPrecioMasivoService);
    jest.clearAllMocks();
  });

  it('should apply a percentage increase to all selected products', async () => {
    const productos = [
      { id: 1, precio: 100, denominacion: 'A' },
      { id: 2, precio: 200, denominacion: 'B' },
    ];

    repository.findByIds.mockResolvedValue(productos);

    const result = await service.aplicarCambios({
      items: [{ id: 1 }, { id: 2 }],
      porcentaje: 10,
      tipoAjuste: 'porcentaje',
      alcance: 'global',
    });

    expect(result).toHaveLength(2);
    expect(result[0].precioNuevo).toBe(110);
    expect(result[1].precioNuevo).toBe(220);
  });

  it('should reject any batch that produces a non-positive price', async () => {
    repository.findByIds.mockResolvedValue([{ id: 1, precio: 0, denominacion: 'A' }]);

    await expect(
      service.aplicarCambios({
        items: [{ id: 1 }],
        porcentaje: 10,
        tipoAjuste: 'porcentaje',
        alcance: 'global',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should pass the line filter to the repository', async () => {
    repository.findByIds.mockResolvedValue([
      { id: 1, lineaId: 4, precio: 100, denominacion: 'A' },
    ]);

    await service.aplicarCambios({
      items: [{ id: 1 }],
      porcentaje: 10,
      tipoAjuste: 'porcentaje',
      alcance: 'linea',
      lineaId: 4,
    });

    expect(repository.findByIds).toHaveBeenCalledWith([1], 4);
  });

  it('should persist the final prices and register history for each product', async () => {
    const productos = [{ id: 1, precio: 100, denominacion: 'A' }];
    repository.findByIds.mockResolvedValue(productos);

    productoPrecioService.registerPriceChange.mockResolvedValue({
      id: 1,
      precioAnterior: 100,
      precioNuevo: 110,
      motivo: 'Cambio masivo de precios',
      fecha: new Date(),
      productoId: 1,
      usuarioId: 5,
    } as any);

    const result = await service.guardarCambios({
      items: [{ id: 1, precio: 110, precioFinal: 110 }],
      usuarioCreatedId: 5,
      tipoAjuste: 'porcentaje',
      alcance: 'global',
    });

    expect(result.actualizados).toBe(1);
    expect(productoPrecioService.registerPriceChange).toHaveBeenCalled();
  });
});

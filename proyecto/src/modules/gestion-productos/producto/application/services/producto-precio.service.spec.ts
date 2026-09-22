import { Test, TestingModule } from '@nestjs/testing';
import { ProductoPrecioService } from './producto-precio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Producto } from '../../domain/entities/producto.entity';
import { HistorialPrecio } from '../../domain/entities/historial-precio.entity';
import { DataSource, Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProductoPrecioService', () => {
  let service: ProductoPrecioService;
  let productoRepository: Repository<Producto>;
  let historialRepository: Repository<HistorialPrecio>;
  let dataSource: DataSource;

  const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      save: jest.fn(),
    },
  };

  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
  };

  const mockProductoRepository = {
    findOne: jest.fn(),
  };

  const mockHistorialRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductoPrecioService,
        {
          provide: getRepositoryToken(Producto),
          useValue: mockProductoRepository,
        },
        {
          provide: getRepositoryToken(HistorialPrecio),
          useValue: mockHistorialRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<ProductoPrecioService>(ProductoPrecioService);
    productoRepository = module.get<Repository<Producto>>(getRepositoryToken(Producto));
    historialRepository = module.get<Repository<HistorialPrecio>>(getRepositoryToken(HistorialPrecio));
    dataSource = module.get<DataSource>(DataSource);

    jest.clearAllMocks();
  });

  describe('registerPriceChange', () => {
    const validParams = {
      productoId: 1,
      precioAnterior: 100,
      precioNuevo: 150,
      motivo: 'Aumento por inflación',
      usuarioId: 1,
    };

    it('should throw BadRequestException if new price is <= 0', async () => {
      await expect(
        service.registerPriceChange({ ...validParams, precioNuevo: 0 }),
      ).rejects.toThrow(BadRequestException);

      await expect(
        service.registerPriceChange({ ...validParams, precioNuevo: -10 }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if motivo is empty', async () => {
      await expect(
        service.registerPriceChange({ ...validParams, motivo: '' }),
      ).rejects.toThrow(BadRequestException);

      await expect(
        service.registerPriceChange({ ...validParams, motivo: '   ' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if product is not found', async () => {
      mockProductoRepository.findOne.mockResolvedValue(null);

      await expect(
        service.registerPriceChange(validParams),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully update price and create history in a transaction', async () => {
      const mockProducto = { id: 1, precio: 100, usuarioUpdated: null };
      mockProductoRepository.findOne.mockResolvedValue(mockProducto);
      
      const mockSavedHistorial = { ...validParams, id: 1, fecha: new Date() };
      mockQueryRunner.manager.save.mockResolvedValueOnce(mockProducto); // mock save producto
      mockQueryRunner.manager.save.mockResolvedValueOnce(mockSavedHistorial); // mock save historial

      const result = await service.registerPriceChange(validParams);

      expect(result).toEqual(mockSavedHistorial);
      expect(mockQueryRunner.connect).toHaveBeenCalled();
      expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.manager.save).toHaveBeenCalledTimes(2);
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });

    it('should rollback transaction on error', async () => {
      mockProductoRepository.findOne.mockResolvedValue({ id: 1, precio: 100 });
      mockQueryRunner.manager.save.mockRejectedValueOnce(new Error('DB Error'));

      await expect(
        service.registerPriceChange(validParams),
      ).rejects.toThrow('DB Error');

      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });
  });

  describe('getHistorial', () => {
    it('should return history of a product', async () => {
      const mockHistory = [{ id: 1, precioNuevo: 150 }];
      mockHistorialRepository.find.mockResolvedValue(mockHistory);

      const result = await service.getHistorial(1);

      expect(result).toEqual(mockHistory);
      expect(mockHistorialRepository.find).toHaveBeenCalledWith({
        where: { productoId: 1 },
        order: { fecha: 'DESC' },
        relations: ['usuario'],
      });
    });
  });
});

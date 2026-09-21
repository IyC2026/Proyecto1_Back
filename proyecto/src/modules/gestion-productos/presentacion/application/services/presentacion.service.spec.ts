import { ConflictException, NotFoundException } from '@nestjs/common';
import { PresentacionService } from './presentacion.service';
import { IPresentacionRepository } from '../../domain/interfaces/presentacion.repository.interface';
import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import { Presentacion } from '../../domain/entities/presentacion.entity';

describe('PresentacionService (CR-002)', () => {
  let service: PresentacionService;
  let mockRepository: Partial<IPresentacionRepository>;
  let mockUsuarioService: Partial<UsuarioService>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findOne: jest.fn(),
      findByDenominacionWith: jest.fn(),
      findByDenominacionFiltered: jest.fn(),
      findAllListado: jest.fn(),
      remove: jest.fn(),
    };

    mockUsuarioService = {
      findOne: jest.fn().mockResolvedValue({ id: 1, denominacion: 'Admin' } as any),
    };

    service = new PresentacionService(
      mockRepository as IPresentacionRepository,
      mockUsuarioService as UsuarioService,
    );
  });

  it('debe crear una Presentación correctamente si no está duplicada', async () => {
    (mockRepository.findByDenominacionWith as jest.Mock).mockResolvedValue(null);
    (mockRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      denominacion: '1l',
    } as unknown as Presentacion);

    const result = await service.create({
      denominacion: '1l',
      usuarioCreatedId: 1,
    });

    expect(result).toBeDefined();
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ denominacion: '1l' }),
    );
  });

  it('debe lanzar ConflictException al crear si la denominación ya existe', async () => {
    (mockRepository.findByDenominacionWith as jest.Mock).mockResolvedValue({
      id: 2,
      denominacion: '1L',
    } as unknown as Presentacion);

    await expect(
      service.create({
        denominacion: '1l',
        usuarioCreatedId: 1,
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('debe lanzar ConflictException al eliminar si está asociada a productos activos', async () => {
    (mockRepository.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      denominacion: '1L',
      productos: [{ id: 100, denominacion: 'Coca 1L', deletedAt: null }],
    } as unknown as Presentacion);

    await expect(service.remove(1, 1)).rejects.toThrow(ConflictException);
  });

  it('debe lanzar NotFoundException si la presentación no existe', async () => {
    (mockRepository.findOne as jest.Mock).mockResolvedValue(null);

    await expect(service.findEntityById(999)).rejects.toThrow(NotFoundException);
  });
});

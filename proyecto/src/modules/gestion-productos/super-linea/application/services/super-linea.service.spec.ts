import { ConflictException, NotFoundException } from '@nestjs/common';
import { SuperLineaService } from './super-linea.service';
import { ISuperLineaRepository } from '../../domain/interfaces/super-linea.repository.interface';
import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import { SuperLinea } from '../../domain/entities/super-linea.entity';

describe('SuperLineaService (CR-003)', () => {
  let service: SuperLineaService;
  let mockRepository: Partial<ISuperLineaRepository>;
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

    service = new SuperLineaService(
      mockRepository as ISuperLineaRepository,
      mockUsuarioService as UsuarioService,
    );
  });

  it('debe crear una SuperLínea correctamente si la denominación está libre', async () => {
    (mockRepository.findByDenominacionWith as jest.Mock).mockResolvedValue(null);
    (mockRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      denominacion: 'bebidas',
    } as unknown as SuperLinea);

    const result = await service.create({
      denominacion: 'bebidas',
      usuarioCreatedId: 1,
    });

    expect(result).toBeDefined();
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ denominacion: 'bebidas' }),
    );
  });

  it('debe lanzar ConflictException al crear si la denominación ya existe', async () => {
    (mockRepository.findByDenominacionWith as jest.Mock).mockResolvedValue({
      id: 2,
      denominacion: 'BEBIDAS',
    } as unknown as SuperLinea);

    await expect(
      service.create({
        denominacion: 'bebidas',
        usuarioCreatedId: 1,
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('debe lanzar ConflictException al eliminar si tiene líneas activas asociadas', async () => {
    (mockRepository.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      denominacion: 'Bebidas',
      lineas: [{ id: 10, denominacion: 'Gaseosas', deletedAt: null }],
    } as unknown as SuperLinea);

    await expect(service.remove(1, 1)).rejects.toThrow(ConflictException);
  });

  it('debe lanzar NotFoundException si no encuentra la SuperLínea', async () => {
    (mockRepository.findOne as jest.Mock).mockResolvedValue(null);

    await expect(service.findEntityById(999)).rejects.toThrow(NotFoundException);
  });
});

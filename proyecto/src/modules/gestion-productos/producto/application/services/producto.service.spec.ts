import { BadRequestException } from '@nestjs/common';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { ProductoService } from './producto.service';

describe('ProductoService denomination rules', () => {
  const marca = { id: 2, denominacion: 'Marca X' };
  const linea = { id: 3, denominacion: 'Línea Y' };
  const presentacion = { id: 4, denominacion: '1L' };
  const usuario = { id: 7 };
  const repository = {
    create: jest.fn(async () => ({ denominacion: 'Marca X Línea Y 1L' })),
    update: jest.fn(async () => ({})),
    findOne: jest.fn(async () => null as any),
  };
  const relatedEntitiesValidator = {
    validarYObtenerEntidadesRelacionadas: jest.fn(async () => ({
      marca,
      linea,
      presentacion,
    })),
  };
  const uniquenessValidator = {
    validarDenominacionUnica: jest.fn(async () => undefined),
    validarCodigoProveedorUnico: jest.fn(async () => undefined),
  };
  const usuarioValidator = {
    validarUsuarioExiste: jest.fn(async () => usuario),
  };
  const intrinsicValidationService = {
    validarDatosBasicos: jest.fn(() => undefined),
  };
  const validationService = {
    validarEntidadesRelacionadas: jest.fn(() => undefined),
  };
  let service: ProductoService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProductoService(
      repository as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      intrinsicValidationService as any,
      validationService as any,
      relatedEntitiesValidator as any,
      uniquenessValidator as any,
      usuarioValidator as any,
      {} as any,
    );
  });

  it('generates the product denomination from its catalog associations', async () => {
    await service.create({
      denominacionPersonalizada: false,
      marcaId: marca.id,
      lineaId: linea.id,
      presentacionId: presentacion.id,
      usuarioCreatedId: usuario.id,
      alicuotaIva: 21,
      precio: 100,
    } as any);

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        denominacion: 'Marca X Línea Y 1L',
        denominacionPersonalizada: false,
      }),
      linea,
      marca,
      usuario,
    );
    expect(uniquenessValidator.validarDenominacionUnica).toHaveBeenCalledWith(
      'Marca X Línea Y 1L',
    );
  });

  it('preserves a manually entered denomination', async () => {
    await service.create({
      denominacionPersonalizada: true,
      denominacion: 'Nombre manual',
      marcaId: marca.id,
      lineaId: linea.id,
      presentacionId: presentacion.id,
      usuarioCreatedId: usuario.id,
      alicuotaIva: 21,
      precio: 100,
    } as any);

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        denominacion: 'Nombre manual',
        denominacionPersonalizada: true,
      }),
      linea,
      marca,
      usuario,
    );
  });

  it('rejects creation when an associated presentation cannot be resolved', async () => {
    relatedEntitiesValidator.validarYObtenerEntidadesRelacionadas.mockImplementationOnce(
      async () => {
        throw new BadRequestException('Presentación inválida');
      },
    );

    await expect(
      service.create({
        marcaId: marca.id,
        lineaId: linea.id,
        presentacionId: 999,
        usuarioCreatedId: usuario.id,
      } as any),
    ).rejects.toThrow('Presentación inválida');
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('does not allow a generic product update to bypass price history', async () => {
    repository.findOne.mockImplementationOnce(async () => ({
      id: 1,
      precio: 100,
      denominacion: 'Marca X Línea Y 1L',
      marcaId: marca.id,
      lineaId: linea.id,
      presentacionId: presentacion.id,
      denominacionPersonalizada: false,
    }));

    await expect(service.update(1, { precio: 120 } as any)).rejects.toThrow(
      'El precio debe modificarse desde el endpoint de cambio de precio indicando el motivo.',
    );
    expect(repository.update).not.toHaveBeenCalled();
  });
});

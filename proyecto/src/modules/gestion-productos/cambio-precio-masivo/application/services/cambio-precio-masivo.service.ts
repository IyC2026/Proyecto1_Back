import {
  Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductoPrecioService } from '../../../producto/application/services/producto-precio.service';
import { CambioPrecioMasivoDto } from '../dto/cambio-precio-masivo.dto';
import { Inject } from '@nestjs/common';
import { ICambioPrecioMasivoRepository } from '../../domain/interfaces/cambio-precio-masivo.repository.interface';
import { CambioPrecioMasivoHelper } from '../../domain/helpers/cambio-precio-masivo.helper';
import { CambioPrecioMasivoMapper } from '../../mappers/cambio-precio-masivo.mapper';

@Injectable()
export class CambioPrecioMasivoService {
  constructor(
    @Inject('ICambioPrecioMasivoRepository')
    private readonly repository: ICambioPrecioMasivoRepository,
    private readonly productoPrecioService: ProductoPrecioService,
    private readonly dataSource: DataSource,
  ) {}

  async aplicarCambios(dto: CambioPrecioMasivoDto) {
    const cambios = await this.prepararCambios(dto);
    return cambios.map(({ producto, precioNuevo }) =>
      CambioPrecioMasivoMapper.toResultado(producto, precioNuevo),
    );
  }

  async guardarCambios(dto: CambioPrecioMasivoDto) {
    const cambios = await this.prepararCambios(dto);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let actualizados = 0;

      for (const cambio of cambios) {
        await this.repository.actualizarPrecio(
          cambio.producto,
          cambio.precioNuevo,
          dto.usuarioCreatedId ?? dto.usuarioId ?? 0,
          queryRunner.manager,
        );

        await this.productoPrecioService.registerPriceChange(
          {
            productoId: cambio.producto.id,
            precioAnterior: cambio.precioAnterior,
            precioNuevo: cambio.precioNuevo,
            motivo: CambioPrecioMasivoHelper.crearMotivo(dto),
            usuarioId: dto.usuarioCreatedId ?? dto.usuarioId ?? 0,
          },
          queryRunner.manager,
        );

        actualizados += 1;
      }

      await queryRunner.commitTransaction();

      return {
        actualizado: true,
        actualizados,
        mensaje: `Se actualizaron ${actualizados} precios correctamente.`,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async prepararCambios(dto: CambioPrecioMasivoDto) {
    const ids = CambioPrecioMasivoHelper.obtenerIds(dto.items);
    const lineaId = CambioPrecioMasivoHelper.obtenerLineaId(dto);
    const productos = await this.repository.findByIds(ids, lineaId);
    return CambioPrecioMasivoHelper.prepararCambios(productos, dto.items, dto);
  }

}

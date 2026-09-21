import { Presentacion } from '../domain/entities/presentacion.entity';
import { PresentacionDto } from '../dto/presentacion.dto';

export class PresentacionMapper {
  static toDto(entity: Presentacion): PresentacionDto {
    return {
      id: entity.id,
      denominacion: entity.denominacion,
      observacion: entity.observacion ?? '',
      sistema: entity.sistema ?? 0,
      deletedAt: entity.deletedAt ? entity.deletedAt.toISOString() : null,
    };
  }
}

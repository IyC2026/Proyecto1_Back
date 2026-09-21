import { SuperLinea } from '../domain/entities/super-linea.entity';
import { SuperLineaDto } from '../dto/super-linea.dto';

export class SuperLineaMapper {
  static toDto(entity: SuperLinea): SuperLineaDto {
    return {
      id: entity.id,
      denominacion: entity.denominacion,
      observacion: entity.observacion ?? '',
      sistema: entity.sistema ?? 0,
      deletedAt: entity.deletedAt ? entity.deletedAt.toISOString() : null,
    };
  }
}

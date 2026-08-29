import { Linea } from '../domain/entities/linea.entity';
import { LineaDto } from '../dto/linea.dto';
export declare class LineaMapper {
    private static readonly logger;
    static toDto(entity: Linea): LineaDto;
}

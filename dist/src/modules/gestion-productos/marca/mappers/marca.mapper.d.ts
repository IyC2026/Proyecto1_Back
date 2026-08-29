import { Marca } from '../domain/entities/marca.entity';
import { MarcaDto } from '../dto/marca.dto';
export declare class MarcaMapper {
    private static readonly logger;
    static toDto(entity: Marca): MarcaDto;
}

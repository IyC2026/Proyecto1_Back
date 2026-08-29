import { ConfiguracionSistema } from '../domain/entities/configuracion-sistema.entity';
import { ConfiguracionSistemaDto } from '../dto/configuracion-sistema.dto';
export declare class ConfiguracionSistemaMapper {
    private static readonly logger;
    static toDto(entity: ConfiguracionSistema): ConfiguracionSistemaDto;
}

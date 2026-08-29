import { Usuario } from '../domain/entities/usuario.entity';
import { Usuario2Dto } from '../dto/usuario2.dto';
export declare class UsuarioMapper {
    private static readonly logger;
    static toDto(entity: Usuario): Usuario2Dto;
}

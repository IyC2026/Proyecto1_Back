import { OperadorDto } from 'src/modules/gestion-documentos/operador.dto';
import { OperadorSearchDto } from 'src/modules/gestion-documentos/operador-search.dto';
import { Cliente } from '../domain/entities/cliente.entity';
export declare class ClienteMapper {
    static toOperadorDto(cliente: Cliente, empresaId: number): OperadorDto;
    static toOperadorSearchDto(cliente: Cliente, empresaId: number): OperadorSearchDto;
}

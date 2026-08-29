import { OperadorDto } from 'src/modules/gestion-documentos/operador.dto';
import { GetProveedorDto } from '../dto/get-proveedor.dto';
import { OperadorSearchDto } from 'src/modules/gestion-documentos/operador-search.dto';
import { Proveedor } from '../domain/entities/proveedor.entity';
import { ProveedorDto } from '../dto/proveedor.dto';
export declare class ProveedorMapper {
    static toOperadorDto(proveedor: Proveedor, empresaId: number): OperadorDto;
    static toDto2(proveedor: Proveedor, empresaId: number): ProveedorDto;
    static toDto(entity: Proveedor): GetProveedorDto;
    static toOperadorSearchDto(proveedor: Proveedor, empresaId: number): OperadorSearchDto;
}

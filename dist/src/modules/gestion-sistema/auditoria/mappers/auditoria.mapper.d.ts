import { Producto } from 'src/modules/gestion-productos/producto/domain/entities/producto.entity';
import { AuditoriaDto } from '../dto/auditoria.dto';
import { Marca } from 'src/modules/gestion-productos/marca/domain/entities/marca.entity';
import { Personal } from 'src/modules/organizacion/personal/domain/entities/personal.entity';
import { Cliente } from 'src/modules/organizacion/cliente/domain/entities/cliente.entity';
import { Proveedor } from 'src/modules/organizacion/proveedor/domain/entities/proveedor.entity';
export declare class AuditoriaMapper {
    static mapProductoToDto(entity: Producto): AuditoriaDto;
    static mapClienteToDto(entity: Cliente): AuditoriaDto;
    static mapProveedorToDto(entity: Proveedor): AuditoriaDto;
    static mapPersonalToDto(entity: Personal): AuditoriaDto;
    static mapMarcaToDto(entity: Marca): AuditoriaDto;
}

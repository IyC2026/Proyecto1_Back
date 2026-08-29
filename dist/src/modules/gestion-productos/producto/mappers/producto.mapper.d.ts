import { Producto } from '../domain/entities/producto.entity';
import { GetProductoDto } from '../dto/get-producto.dto';
import { UpdatePrecioDto } from '../dto/update-precio.dto';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { ProductoDto } from '../dto/producto.dto';
export declare class ProductoMapper {
    private static readonly logger;
    static toBusquedaDto(entity: Producto): GetProductoDto;
    static mapPrecios(entity: Producto, dto: UpdatePrecioDto, usuario: Usuario): void;
    static toDto(entity: Producto): ProductoDto;
}

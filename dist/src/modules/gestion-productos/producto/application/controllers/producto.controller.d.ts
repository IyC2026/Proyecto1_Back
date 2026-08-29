import { CreateProductoDto } from '../../dto/create-producto.dto';
import { UpdateProductoDto } from '../../dto/update-producto.dto';
import { GetProductoDto } from '../../dto/get-producto.dto';
import { SearchProductoPaginationWithDto } from '../../dto/search-producto-pagination-with.dto';
import { ProductoDto } from '../../dto/producto.dto';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { DenominacionBusquedaDto } from 'src/modules/common/dto/denominacion-busqueda.dto';
import { SearchProductoRapidoDto } from '../../dto/search-producto-rapido.dto';
import { ProductoService } from '../services/producto.service';
export declare class ProductoController {
    private readonly service;
    private readonly logger;
    constructor(service: ProductoService);
    private readonly ENTITY_NAME;
    create(createDto: CreateProductoDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findAllMarcasFor(dto: DenominacionBusquedaDto): Promise<{
        data: import("../../../marca/dto/marca.dto").MarcaDto[];
        total: number;
    }>;
    findAllLineasFor(dto: DenominacionBusquedaDto): Promise<{
        data: import("../../../linea/dto/linea.dto").LineaDto[];
        total: number;
    }>;
    searchRapido(dto: SearchProductoRapidoDto): Promise<{
        data: GetProductoDto[];
        total: number;
    }>;
    search(dto: SearchProductoPaginationWithDto): Promise<{
        data: GetProductoDto[];
        total: number;
    }>;
    getMarcaDelProducto(id: number): Promise<import("../../../marca/domain/entities/marca.entity").Marca>;
    geLineaDelProducto(id: number): Promise<import("../../../linea/domain/entities/linea.entity").Linea>;
    findOne(id: number): Promise<ProductoDto>;
    update(id: number, updateDto: UpdateProductoDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    remove(id: number, usuarioId: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto>;
}

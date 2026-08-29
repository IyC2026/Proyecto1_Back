import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { ProveedorService } from 'src/modules/organizacion/proveedor/application/services/proveedor.service';
import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import { Producto } from '../../domain/entities/producto.entity';
import { IProductoRepository } from '../../domain/interfaces/producto.repository-interface';
import { CreateProductoDto } from '../../dto/create-producto.dto';
import { GetProductoDto } from '../../dto/get-producto.dto';
import { UpdateProductoDto } from '../../dto/update-producto.dto';
import { LineaService } from 'src/modules/gestion-productos/linea/application/services/linea.service';
import { MarcaService } from 'src/modules/gestion-productos/marca/application/services/marca.service';
import { ProductoIntrinsicValidationService } from '../../domain/services/producto-intrinsic-validation.service.ts';
import { ProductoValidationService } from '../../domain/services/producto-validation.service.ts';
import { ProductoRelatedEntitiesValidator } from '../../infraestructure/validators/producto-related-entities.validator.ts';
import { ProductoUniquenessValidator } from '../../infraestructure/validators/producto-uniqueness.validator.ts';
import { UsuarioValidator } from 'src/modules/common/utils/validation/usuario-validator';
import { ProductoDeletePolicy } from '../policies/producto-delete.policy';
export declare class ProductoService {
    private readonly repository;
    private readonly lineaService;
    private readonly marcaService;
    private readonly proveedorService;
    private readonly usuarioService;
    private readonly intrinsicValidationService;
    private readonly validationService;
    private readonly relatedEntitiesValidator;
    private readonly uniquenessValidator;
    private readonly usuarioValidator;
    private readonly productoDeletePolicy;
    private readonly logger;
    constructor(repository: IProductoRepository, lineaService: LineaService, marcaService: MarcaService, proveedorService: ProveedorService, usuarioService: UsuarioService, intrinsicValidationService: ProductoIntrinsicValidationService, validationService: ProductoValidationService, relatedEntitiesValidator: ProductoRelatedEntitiesValidator, uniquenessValidator: ProductoUniquenessValidator, usuarioValidator: UsuarioValidator, productoDeletePolicy: ProductoDeletePolicy);
    private readonly ENTITY_NAME;
    create(dto: CreateProductoDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    update(id: number, dto: UpdateProductoDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByRapido(codigo: string, exacto: boolean, skip: number, take: number): Promise<{
        data: GetProductoDto[];
        total: number;
    }>;
    findBy(denominacion: string, codigoProveedor: string, codProveedorExacto: boolean, codigoReferencia: string, marca_id: number, linea_id: number, proveedor_id: number, conStock: boolean, skip: number, take: number): Promise<{
        data: GetProductoDto[];
        total: number;
    }>;
    buscarMarcaDesdeProducto(id: number): Promise<import("../../../marca/domain/entities/marca.entity").Marca>;
    buscarLineaDesdeProducto(id: number): Promise<import("../../../linea/domain/entities/linea.entity").Linea>;
    findByIdConAuditoria(id: number): Promise<import("../../../../gestion-sistema/auditoria/dto/auditoria.dto").AuditoriaDto>;
    findDtoById(id: number): Promise<import("../../dto/producto.dto").ProductoDto>;
    findEntityById(id: number): Promise<Producto>;
    remove(id: number, usuarioId: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findAllForLineas(denominacion: string): Promise<{
        data: import("../../../linea/dto/linea.dto").LineaDto[];
        total: number;
    }>;
    findAllForMarcas(denominacion: string): Promise<{
        data: import("../../../marca/dto/marca.dto").MarcaDto[];
        total: number;
    }>;
    findByDenominacionCodigoProveedorFiltered(denominacion: string, skip?: number, take?: number): Promise<{
        data: GetProductoDto[];
        total: number;
    }>;
    existsProductosActivosByMarca(marcaId: number): Promise<boolean>;
    existsProductosActivosByLinea(lineaId: number): Promise<boolean>;
    findByIds(ids: number[]): Promise<Producto[]>;
    incrementarStock(uow: IUnitOfWork, productoId: number, cantidad: number, origen?: string): Promise<number>;
    decrementarStock(uow: IUnitOfWork, productoId: number, cantidad: number, origen?: string): Promise<number>;
    private ajustarStockInterno;
    private validarYPrepararCreacion;
    private validarYPrepararActualizacion;
}

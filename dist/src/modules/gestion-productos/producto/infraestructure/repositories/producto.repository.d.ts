import { CreateProductoDto } from '../../dto/create-producto.dto';
import { Producto } from '../../domain/entities/producto.entity';
import { IProductoRepository } from '../../domain/interfaces/producto.repository-interface';
import { ProductoPersistenceAdapter } from './producto.persistence-adapters';
import { Linea } from '../../../linea/domain/entities/linea.entity';
import { Marca } from '../../../marca/domain/entities/marca.entity';
import { UpdateProductoDto } from '../../dto/update-producto.dto';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { UpdatePrecioDto } from '../../dto/update-precio.dto';
export declare class ProductoRepository implements IProductoRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: ProductoPersistenceAdapter);
    findByIds(ids: number[]): Promise<Producto[]>;
    private readonly ENTITY_NAME;
    create(data: CreateProductoDto, linea: Linea, marca: Marca, usuario: Usuario): Promise<Producto>;
    update(id: number, data: UpdateProductoDto, linea: Linea, marca: Marca, usuario: Usuario): Promise<Producto>;
    updateEntity(uow: IUnitOfWork, data: Producto): Promise<Producto>;
    findBy(denominacion: string, codigoProveedor: string, codProveedorExacto: boolean, codigoReferencia: string, marca_id: number, linea_id: number, proveedor_id: number, conStock: boolean, skip: number, take: number): Promise<{
        data: Producto[];
        total: number;
    }>;
    findByRapido(codigo: string, exacto: boolean, skip: number, take: number): Promise<{
        data: Producto[];
        total: number;
    }>;
    findOne(id: number): Promise<Producto | null>;
    findByIdConAuditoria(id: number): Promise<Producto | null>;
    remove(producto: Producto, usuario: Usuario): Promise<Producto>;
    isCodigoProveedorDuplicado(codigoProveedor: string | null, id?: number): Promise<boolean>;
    actualizarPrecio(id: number, dto: UpdatePrecioDto, usuario: Usuario): Promise<void>;
    findByDenominacion(denominacion: string): Promise<Producto | null>;
    findByDenominacionCodigoProveedorFiltered(denominacion: string, skip?: number, take?: number): Promise<{
        data: Producto[];
        total: number;
    }>;
    existsProductosActivosByMarca(marcaId: number): Promise<boolean>;
    existsProductosActivosByLinea(lineaId: number): Promise<boolean>;
    findByIdWithoutRelations(id: number): Promise<Producto | null>;
    existsByDenominacion(denominacion: string, excludeId?: number): Promise<boolean>;
    existsByCodigoProveedor(codigoProveedor: string, excludeId: number): Promise<boolean>;
}

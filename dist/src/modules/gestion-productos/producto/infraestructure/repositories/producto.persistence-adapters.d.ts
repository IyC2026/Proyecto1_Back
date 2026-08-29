import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { Linea } from 'src/modules/gestion-productos/linea/domain/entities/linea.entity';
import { Marca } from 'src/modules/gestion-productos/marca/domain/entities/marca.entity';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { Repository, DataSource } from 'typeorm';
import { Producto } from '../../domain/entities/producto.entity';
import { IProductoRepository } from '../../domain/interfaces/producto.repository-interface';
import { CreateProductoDto } from '../../dto/create-producto.dto';
import { UpdatePrecioDto } from '../../dto/update-precio.dto';
import { UpdateProductoDto } from '../../dto/update-producto.dto';
export declare class ProductoPersistenceAdapter implements IProductoRepository {
    private readonly repository;
    private readonly dataSource;
    readonly uow: IUnitOfWork;
    private readonly logger;
    private readonly ENTITY_NAME;
    constructor(repository: Repository<Producto>, dataSource: DataSource, uow: IUnitOfWork);
    create(data: CreateProductoDto, linea: Linea, marca: Marca, usuario: Usuario): Promise<Producto>;
    findOne(id: number): Promise<Producto | null>;
    findByIdConAuditoria(id: number): Promise<Producto | null>;
    findByIdWithoutRelations(id: number): Promise<Producto | null>;
    update(id: number, data: UpdateProductoDto, linea: Linea, marca: Marca, usuario: Usuario): Promise<Producto>;
    updateEntity(uow: IUnitOfWork, producto: Producto): Promise<Producto>;
    remove(entity: Producto, usuario: Usuario): Promise<Producto>;
    findBy(denominacion: string, codigoProveedor: string, codProveedorExacto: boolean, codigoReferencia: string, marca_id: number, linea_id: number, proveedor_id: number, conStock: boolean, skip: number, take: number): Promise<{
        data: Producto[];
        total: number;
    }>;
    findByRapido(codigo: string, exacto: boolean, skip: any, take: number): Promise<{
        data: Producto[];
        total: number;
    }>;
    isCodigoProveedorDuplicado(codigoProveedor: string | null, id?: number): Promise<boolean>;
    actualizarPrecio(id: number, dto: UpdatePrecioDto, usuario: Usuario): Promise<void>;
    findByDenominacion(denominacion: string): Promise<Producto | null>;
    existsByDenominacion(denominacion: string, excludeId?: number): Promise<boolean>;
    findByDenominacionCodigoProveedorFiltered(denominacion: string, skip?: number, take?: number): Promise<{
        data: Producto[];
        total: number;
    }>;
    existsProductosActivosByMarca(marcaId: number): Promise<boolean>;
    existsProductosActivosByLinea(lineaId: number): Promise<boolean>;
    findByIds(ids: number[]): Promise<Producto[]>;
    existsByCodigoProveedor(codigoProveedor: string, excludeId: number): Promise<boolean>;
}

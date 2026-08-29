import { IProveedorRepository } from '../../domain/interfaces/proveedor.interface';
import { CreateProveedorDto } from '../../dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../../dto/update-proveedor.dto';
import { ProveedorPersistenceAdapter } from './proveedor.persistence-adapters';
import { Localidad } from 'src/modules/gutil/localidad/domain/entities/localidad.entity';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { CondicionIva } from 'src/modules/gutil/condicion-iva/domain/entities/condicion-iva.entity';
import { Proveedor } from '../../domain/entities/proveedor.entity';
export declare class ProveedorRepository implements IProveedorRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: ProveedorPersistenceAdapter);
    private readonly ENTITY_NAME;
    create(data: CreateProveedorDto, categoriaIVA: CondicionIva, localidad: Localidad, usuario: Usuario): Promise<Proveedor>;
    update(id: number, data: UpdateProveedorDto, categoriaIVA: CondicionIva, localidad: Localidad, usuario: Usuario): Promise<Proveedor>;
    findByIdConAuditoria(id: number): Promise<Proveedor | null>;
    findAll(skip?: number, take?: number): Promise<Proveedor[]>;
    findBy(denominacion: string, condicionIvaId: number, incluirEliminados: boolean, empresaId?: number, conSaldo?: boolean, skip?: number, take?: number): Promise<{
        data: Proveedor[];
        total: number;
    }>;
    findAllByDenominacion(denominacion: string): Promise<Proveedor[]>;
    findOne(id: number): Promise<Proveedor | null>;
    findByDenominacion(denominacion: string): Promise<Proveedor | null>;
    remove(id: number): Promise<Proveedor>;
    findAllFor(denominacion: string): Promise<Proveedor[]>;
    findAllSistemaFor(denominacion: string): Promise<Proveedor[]>;
    findAllSinSistemaFor(denominacion: string): Promise<Proveedor[]>;
    findByCuit(cuit: string): Promise<Proveedor | null>;
    findPendientesByProveedores(proveedoresIds: number[]): Promise<{
        proveedorId: number;
        cantidad: number;
    }[]>;
    findAllByTipo(denominacion: string, compra: boolean, gasto: boolean): Promise<Proveedor[]>;
}

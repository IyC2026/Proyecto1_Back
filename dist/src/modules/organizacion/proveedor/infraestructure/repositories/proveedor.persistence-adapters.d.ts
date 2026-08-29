import { DataSource, Repository } from 'typeorm';
import { CreateProveedorDto } from '../../dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../../dto/update-proveedor.dto';
import { IProveedorRepository } from '../../domain/interfaces/proveedor.interface';
import { Localidad } from 'src/modules/gutil/localidad/domain/entities/localidad.entity';
import { DomicilioService } from 'src/modules/gutil/domicilio/domicilio.service';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { CondicionIva } from 'src/modules/gutil/condicion-iva/domain/entities/condicion-iva.entity';
import { Proveedor } from '../../domain/entities/proveedor.entity';
export declare class ProveedorPersistenceAdapter implements IProveedorRepository {
    private readonly repository;
    private domicilioService;
    private readonly dataSource;
    readonly uow: IUnitOfWork;
    [x: string]: any;
    private readonly logger;
    private readonly ENTITY_NAME;
    constructor(repository: Repository<Proveedor>, domicilioService: DomicilioService, dataSource: DataSource, uow: IUnitOfWork);
    create(data: CreateProveedorDto, condicionIva: CondicionIva, ciudad: Localidad, usuario: Usuario): Promise<Proveedor>;
    findOne(id: number): Promise<Proveedor | null>;
    findByDenominacion(denominacion: string): Promise<Proveedor | null>;
    findByIdConAuditoria(id: number): Promise<Proveedor | null>;
    findBy(denominacion: string, condicionIvaId: number, incluirEliminados: boolean, empresaId?: number, conSaldo?: boolean, skip?: number, take?: number): Promise<{
        data: Proveedor[];
        total: number;
    }>;
    findAllByDenominacion(denominacion: string): Promise<Proveedor[]>;
    findAllByTipo(denominacion: string, compra: boolean, gasto: boolean): Promise<Proveedor[]>;
    update(id: number, data: UpdateProveedorDto, condicionIva: CondicionIva, localidad: Localidad, usuario: Usuario): Promise<Proveedor>;
    remove(id: number): Promise<Proveedor>;
    findAllFor(denominacion: string): Promise<Proveedor[]>;
    findAllSinSistemaFor(denominacion: string): Promise<Proveedor[]>;
    findAllSistemaFor(denominacion: string): Promise<Proveedor[]>;
    findByCuit(cuit: string): Promise<Proveedor | null>;
}

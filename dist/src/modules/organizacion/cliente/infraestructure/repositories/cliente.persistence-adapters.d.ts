import { DataSource, Repository } from 'typeorm';
import { IClienteRepository } from '../../domain/interfaces/cliente.interface';
import { CreateClienteDto } from '../../dto/create-cliente.dto';
import { UpdateClienteDto } from '../../dto/update-cliente.dto';
import { DomicilioService } from 'src/modules/gutil/domicilio/domicilio.service';
import { Localidad } from 'src/modules/gutil/localidad/domain/entities/localidad.entity';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { Personal } from '../../../personal/domain/entities/personal.entity';
import { Cliente } from '../../domain/entities/cliente.entity';
import { CondicionIva } from 'src/modules/gutil/condicion-iva/domain/entities/condicion-iva.entity';
export declare class ClientePersistenceAdapter implements IClienteRepository {
    private readonly repository;
    private domicilioService;
    private readonly dataSource;
    readonly uow: IUnitOfWork;
    private readonly logger;
    private readonly ENTITY_NAME;
    constructor(repository: Repository<Cliente>, domicilioService: DomicilioService, dataSource: DataSource, uow: IUnitOfWork);
    create(data: CreateClienteDto, condicionIva: CondicionIva, ciudad: Localidad, personal: Personal, usuario: Usuario): Promise<Cliente>;
    findOne(id: number): Promise<Cliente | null>;
    findOneWithRelations(id: number): Promise<Cliente | null>;
    findByDenominacion(denominacion: string): Promise<Cliente | null>;
    findByIdConAuditoria(id: number): Promise<Cliente | null>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<Cliente[]>;
    findBy(denominacion: string, condicionIvaId: number, incluirEliminados: boolean, empresaId?: number, conSaldo?: boolean, skip?: number, take?: number): Promise<{
        data: Cliente[];
        total: number;
    }>;
    findAllByDenominacion(denominacion: string): Promise<Cliente[]>;
    findAllByDenominacionAndCodigo(denominacion: string): Promise<Cliente[]>;
    update(id: number, data: UpdateClienteDto, condicionIva: CondicionIva, localidad: Localidad, personal: Personal, usuario: Usuario): Promise<Cliente>;
    remove(id: number, usuario: Usuario): Promise<Cliente>;
    findByCuit(cuit: string): Promise<Cliente | null>;
    findByDni(dni: string): Promise<Cliente | null>;
}

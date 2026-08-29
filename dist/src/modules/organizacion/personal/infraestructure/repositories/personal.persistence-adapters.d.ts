import { DataSource, Repository } from 'typeorm';
import { IPersonalRepository } from '../../domain/interfaces/personal.interface';
import { CreatePersonalDto } from '../../dto/create-personal.dto';
import { UpdatePersonalDto } from '../../dto/update-personal.dto';
import { Personal } from '../../domain/entities/personal.entity';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import { BasePersistenceAdapter } from 'src/modules/common/persistence/base-persistence.adapter';
export declare class PersonalPersistenceAdapter extends BasePersistenceAdapter<Personal> implements IPersonalRepository {
    private usuarioService;
    private readonly dataSource;
    readonly uow: IUnitOfWork;
    private readonly logger;
    protected readonly ALIAS = "personal";
    private readonly ENTITY_NAME;
    constructor(repository: Repository<Personal>, usuarioService: UsuarioService, dataSource: DataSource, uow: IUnitOfWork);
    create(data: CreatePersonalDto, usuario: Usuario): Promise<Personal>;
    findAll(skip?: number, take?: number): Promise<Personal[]>;
    findAllFor(denominacion: string): Promise<Personal[]>;
    findOne(id: number): Promise<Personal | null>;
    findAllListado(): Promise<Personal[]>;
    findByIdConAuditoria(id: number): Promise<Personal | null>;
    findByDenominacion(denominacion: string): Promise<Personal | null>;
    findAllVendedorFor(denominacion: string): Promise<Personal[]>;
    findBy(denominacion: string, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: Personal[];
        total: number;
    }>;
    update(id: number, data: UpdatePersonalDto, usuario: Usuario): Promise<Personal>;
    remove(id: number): Promise<Personal>;
}

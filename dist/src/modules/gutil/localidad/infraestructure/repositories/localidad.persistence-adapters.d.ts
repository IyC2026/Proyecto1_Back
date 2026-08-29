import { Repository, DataSource } from 'typeorm';
import { CreateLocalidadDto } from '../../dto/create-localidad.dto';
import { Localidad } from '../../domain/entities/localidad.entity';
import { ILocalidadRepository } from '../../domain/interfaces/localidad.repository.interface';
import { UpdateLocalidadDto } from '../../dto/update-localidad.dto';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { Provincia } from 'src/modules/gutil/provincia/domain/entities/provincia.entity';
import { BasePersistenceAdapter } from 'src/modules/common/persistence/base-persistence.adapter';
export declare class LocalidadPersistenceAdapter extends BasePersistenceAdapter<Localidad> implements ILocalidadRepository {
    private readonly dataSource;
    readonly uow: IUnitOfWork;
    private readonly logger;
    private readonly ENTITY_NAME;
    protected readonly ALIAS = "localidad";
    constructor(repository: Repository<Localidad>, dataSource: DataSource, uow: IUnitOfWork);
    create(data: CreateLocalidadDto, provincia: Provincia): Promise<Localidad>;
    findAllFor(): Promise<Localidad[]>;
    findAllListado(): Promise<Localidad[]>;
    findAllForProvincia(provinciaId: number): Promise<Localidad[]>;
    findOne(id: number): Promise<Localidad | null>;
    findByDenominacion(denominacion: string): Promise<Localidad | null>;
    findBy(denominacion: string, provinciaId: number, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: Localidad[];
        total: number;
    }>;
    update(id: number, data: UpdateLocalidadDto, provincia: Provincia): Promise<Localidad>;
    remove(id: number): Promise<Localidad>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto | null>;
}

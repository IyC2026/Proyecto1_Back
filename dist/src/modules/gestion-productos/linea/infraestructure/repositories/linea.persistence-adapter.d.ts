import { Repository, DataSource } from 'typeorm';
import { CreateLineaDto } from '../../dto/create-linea.dto';
import { Linea } from '../../domain/entities/linea.entity';
import { ILineaRepository } from '../../domain/interfaces/linea.repository.interface';
import { UpdateLineaDto } from '../../dto/update-linea.dto';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { BasePersistenceAdapter } from 'src/modules/common/persistence/base-persistence.adapter';
export declare class LineaPersistenceAdapter extends BasePersistenceAdapter<Linea> implements ILineaRepository {
    private readonly dataSource;
    readonly uow: IUnitOfWork;
    private readonly logger;
    protected readonly ALIAS = "linea";
    constructor(repository: Repository<Linea>, dataSource: DataSource, uow: IUnitOfWork);
    create(data: CreateLineaDto): Promise<Linea>;
    update(id: number, data: UpdateLineaDto): Promise<Linea>;
    findOne(id: number): Promise<Linea | null>;
    findAllListado(): Promise<Linea[]>;
    findByDenominacion(denominacion: string): Promise<Linea | null>;
    findByDenominacionWith(denominacion: string): Promise<Linea | null>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: Linea[];
        total: number;
    }>;
    findAllFor(denominacion: string): Promise<Linea[]>;
    findAllSinSistemaFor(denominacion: string): Promise<Linea[]>;
    remove(entity: Linea, usuario: Usuario): Promise<Linea>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto | null>;
}

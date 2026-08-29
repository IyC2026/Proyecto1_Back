import { DataSource, Repository } from 'typeorm';
import { IMarcaRepository } from '../../domain/interfaces/marca.repository.interface';
import { CreateMarcaDto } from '../../dto/create-marca.dto';
import { Marca } from '../../domain/entities/marca.entity';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { BasePersistenceAdapter } from 'src/modules/common/persistence/base-persistence.adapter';
export declare class MarcaPersistenceAdapter extends BasePersistenceAdapter<Marca> implements IMarcaRepository {
    private readonly dataSource;
    readonly uow: IUnitOfWork;
    private readonly logger;
    protected readonly ALIAS = "marca";
    constructor(repository: Repository<Marca>, dataSource: DataSource, uow: IUnitOfWork);
    create(data: CreateMarcaDto): Promise<Marca>;
    findAllFor(denominacion: string): Promise<Marca[]>;
    findAllListado(): Promise<Marca[]>;
    findAllSinSistemaFor(denominacion: string): Promise<Marca[]>;
    findAllSistemaFor(denominacion: string): Promise<Marca[]>;
    findOne(id: number): Promise<Marca | null>;
    findByDenominacion(denominacion: string): Promise<Marca | null>;
    findBy(denominacion: string, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: Marca[];
        total: number;
    }>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto | null>;
    update(id: number, data: Partial<Marca>): Promise<Marca>;
    remove(entity: Marca, usuario: Usuario): Promise<Marca>;
    findByDenominacionWith(denominacion: string): Promise<Marca | null>;
}

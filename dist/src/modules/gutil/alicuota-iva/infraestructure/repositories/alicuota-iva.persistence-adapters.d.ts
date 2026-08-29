import { BasePersistenceAdapter } from 'src/modules/common/persistence/base-persistence.adapter';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { DataSource, Repository } from 'typeorm';
import { AlicuotaIva } from '../../domain/entities/alicuota-iva.entity';
import { IAlicuotaIvaRepository } from '../../domain/interfaces/alicuota-iva.repository.interface';
import { CreateAlicuotaIvaDto } from '../../dto/create-alicuota-iva.dto';
export declare class AlicuotaIvaPersistenceAdapter extends BasePersistenceAdapter<AlicuotaIva> implements IAlicuotaIvaRepository {
    private readonly dataSource;
    readonly uow: IUnitOfWork;
    protected readonly ALIAS = "alicuotaIva";
    private readonly logger;
    constructor(repository: Repository<AlicuotaIva>, dataSource: DataSource, uow: IUnitOfWork);
    create(data: CreateAlicuotaIvaDto): Promise<AlicuotaIva>;
    update(id: number, data: Partial<AlicuotaIva>): Promise<AlicuotaIva>;
    remove(entity: AlicuotaIva, usuario: Usuario): Promise<AlicuotaIva>;
    findAllFor(denominacion: string): Promise<AlicuotaIva[]>;
    findAllSistemaFor(denominacion: string): Promise<AlicuotaIva[]>;
    findByDenominacion(denominacion: string): Promise<AlicuotaIva | null>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto | null>;
    findAllSinSistemaFor(denominacion: string): Promise<AlicuotaIva[]>;
    findOne(id: number): Promise<AlicuotaIva>;
    findBy(denominacion: string, skip?: number, take?: number): Promise<{
        data: AlicuotaIva[];
        total: number;
    }>;
    findByDenominacionWith(denominacion: string): Promise<AlicuotaIva | null>;
    getTipoMovimiento(uow: IUnitOfWork, id: number): Promise<AlicuotaIva | null>;
    findAllListado(): Promise<AlicuotaIva[]>;
}

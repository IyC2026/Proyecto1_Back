import { DataSource, Repository } from 'typeorm';
import { ICondicionIvaRepository } from '../../domain/interfaces/condicion-iva.repository.interface';
import { CreateCondicionIvaDto } from '../../dto/create-condicion-iva.dto';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { CondicionIva } from '../../domain/entities/condicion-iva.entity';
export declare class CondicionIvaPersistenceAdapter implements ICondicionIvaRepository {
    private readonly repository;
    private readonly dataSource;
    readonly uow: IUnitOfWork;
    private readonly logger;
    private readonly ENTITY_NAME;
    constructor(repository: Repository<CondicionIva>, dataSource: DataSource, uow: IUnitOfWork);
    create(data: CreateCondicionIvaDto): Promise<CondicionIva>;
    findAll(skip?: number, take?: number): Promise<CondicionIva[]>;
    findAllListado(): Promise<CondicionIva[]>;
    findOne(id: number): Promise<CondicionIva | null>;
    findByDenominacion(denominacion: string): Promise<CondicionIva | null>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<{
        data: CondicionIva[];
        total: number;
    }>;
    findAllFor(): Promise<CondicionIva[]>;
    update(id: number, data: Partial<CondicionIva>): Promise<CondicionIva>;
    remove(entity: CondicionIva): Promise<CondicionIva>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto | null>;
}

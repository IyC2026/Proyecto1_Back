import { CreateCondicionIvaDto } from '../../dto/create-condicion-iva.dto';
import { ICondicionIvaRepository } from '../../domain/interfaces/condicion-iva.repository.interface';
import { CondicionIvaPersistenceAdapter } from './condicion-iva.persistence-adapters';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { CondicionIva } from '../../domain/entities/condicion-iva.entity';
export declare class CondicionIVARepository implements ICondicionIvaRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: CondicionIvaPersistenceAdapter);
    private readonly ENTITY_NAME;
    create(data: CreateCondicionIvaDto): Promise<CondicionIva>;
    update(id: number, data: Partial<CondicionIva>): Promise<CondicionIva>;
    findAll(skip?: number, take?: number): Promise<CondicionIva[]>;
    findAllListado(): Promise<CondicionIva[]>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<{
        data: CondicionIva[];
        total: number;
    }>;
    findAllFor(): Promise<CondicionIva[]>;
    findOne(id: number): Promise<CondicionIva | null>;
    findByDenominacion(denominacion: string): Promise<CondicionIva | null>;
    remove(data: CondicionIva): Promise<CondicionIva>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto | null>;
}

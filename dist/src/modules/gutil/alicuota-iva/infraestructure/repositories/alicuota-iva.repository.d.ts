import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { IAlicuotaIvaRepository } from '../../domain/interfaces/alicuota-iva.repository.interface';
import { AlicuotaIva } from '../../domain/entities/alicuota-iva.entity';
import { CreateAlicuotaIvaDto } from '../../dto/create-alicuota-iva.dto';
import { AlicuotaIvaPersistenceAdapter } from './alicuota-iva.persistence-adapters';
export declare class AlicuotaIvaRepository implements IAlicuotaIvaRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: AlicuotaIvaPersistenceAdapter);
    private readonly ENTITY_NAME;
    create(data: CreateAlicuotaIvaDto): Promise<AlicuotaIva>;
    update(id: number, data: Partial<AlicuotaIva>): Promise<AlicuotaIva>;
    findAllFor(denominacion: string): Promise<AlicuotaIva[]>;
    findAllListado(): Promise<AlicuotaIva[]>;
    findAllSinSistemaFor(denominacion: string): Promise<AlicuotaIva[]>;
    findAllSistemaFor(denominacion: string): Promise<AlicuotaIva[]>;
    findBy(denominacion: string, skip?: number, take?: number): Promise<{
        data: AlicuotaIva[];
        total: number;
    }>;
    findOne(id: number): Promise<AlicuotaIva | null>;
    findByDenominacion(denominacion: string): Promise<AlicuotaIva | null>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto | null>;
    remove(data: AlicuotaIva, usuario: Usuario): Promise<AlicuotaIva>;
    findByDenominacionWith(denominacion: string): Promise<AlicuotaIva | null>;
}

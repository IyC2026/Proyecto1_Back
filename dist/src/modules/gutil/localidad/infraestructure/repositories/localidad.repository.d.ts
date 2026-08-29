import { CreateLocalidadDto } from '../../dto/create-localidad.dto';
import { Localidad } from '../../domain/entities/localidad.entity';
import { ILocalidadRepository } from '../../domain/interfaces/localidad.repository.interface';
import { UpdateLocalidadDto } from '../../dto/update-localidad.dto';
import { LocalidadPersistenceAdapter } from './localidad.persistence-adapters';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { Provincia } from 'src/modules/gutil/provincia/domain/entities/provincia.entity';
export declare class LocalidadRepository implements ILocalidadRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: LocalidadPersistenceAdapter);
    private readonly ENTITY_NAME;
    create(data: CreateLocalidadDto, provincia: Provincia): Promise<Localidad>;
    update(id: number, data: UpdateLocalidadDto, provincia: Provincia): Promise<Localidad>;
    findAllFor(): Promise<Localidad[]>;
    findAllForProvincia(provinciaId: number): Promise<Localidad[]>;
    findAllListado(): Promise<Localidad[]>;
    findBy(denominacion: string, provinciaId: number, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: Localidad[];
        total: number;
    }>;
    findOne(id: number): Promise<Localidad | null>;
    findByDenominacion(denominacion: string): Promise<Localidad | null>;
    remove(id: number): Promise<Localidad>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto | null>;
}

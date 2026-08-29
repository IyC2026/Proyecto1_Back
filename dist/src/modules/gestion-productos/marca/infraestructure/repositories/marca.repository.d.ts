import { CreateMarcaDto } from '../../dto/create-marca.dto';
import { Marca } from '../../domain/entities/marca.entity';
import { IMarcaRepository } from '../../domain/interfaces/marca.repository.interface';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { MarcaPersistenceAdapter } from './marca.persistence-adapters';
export declare class MarcaRepository implements IMarcaRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: MarcaPersistenceAdapter);
    private readonly ENTITY_NAME;
    create(data: CreateMarcaDto): Promise<Marca>;
    update(id: number, data: Partial<Marca>): Promise<Marca>;
    findAllFor(denominacion: string): Promise<Marca[]>;
    findAllListado(): Promise<Marca[]>;
    findAllSinSistemaFor(denominacion: string): Promise<Marca[]>;
    findAllSistemaFor(denominacion: string): Promise<Marca[]>;
    findBy(denominacion: string, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: Marca[];
        total: number;
    }>;
    findOne(id: number): Promise<Marca | null>;
    findByDenominacion(denominacion: string): Promise<Marca | null>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto | null>;
    remove(data: Marca, usuario: Usuario): Promise<Marca>;
    findByDenominacionWith(denominacion: string): Promise<Marca | null>;
}

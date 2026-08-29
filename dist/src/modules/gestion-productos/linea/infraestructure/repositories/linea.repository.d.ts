import { ILineaRepository } from '../../domain/interfaces/linea.repository.interface';
import { CreateLineaDto } from '../../dto/create-linea.dto';
import { Linea } from '../../domain/entities/linea.entity';
import { UpdateLineaDto } from '../../dto/update-linea.dto';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { LineaPersistenceAdapter } from './linea.persistence-adapter';
export declare class LineaRepository implements ILineaRepository {
    private readonly persistenceService;
    constructor(persistenceService: LineaPersistenceAdapter);
    private readonly logger;
    private readonly ENTITY_NAME;
    create(data: CreateLineaDto): Promise<Linea>;
    update(id: number, data: UpdateLineaDto): Promise<Linea>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: Linea[];
        total: number;
    }>;
    findAllFor(denominacion: string): Promise<Linea[]>;
    findAllSinSistemaFor(denominacion: string): Promise<Linea[]>;
    findOne(id: number): Promise<Linea | null>;
    findByDenominacion(denominacion: string): Promise<Linea | null>;
    findByDenominacionWith(denominacion: string): Promise<Linea | null>;
    remove(data: Linea, usuario: Usuario): Promise<Linea>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto | null>;
    findAllListado(): Promise<Linea[]>;
}

import { ConfiguracionSistemaPersistenceAdapter } from './configuracion-sistema-adapters';
import { IConfiguracionSistemaRepository } from '../../domain/interfaces/configuracion-sistema.repository.interface';
import { ConfiguracionSistema } from '../../domain/entities/configuracion-sistema.entity';
import { CreateConfiguracionSistemaDto } from '../../dto/create-configuracion-sistema.dto';
export declare class ConfiguracionSistemaRepository implements IConfiguracionSistemaRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: ConfiguracionSistemaPersistenceAdapter);
    private readonly ENTITY_NAME;
    create(data: CreateConfiguracionSistemaDto): Promise<ConfiguracionSistema>;
    update(id: number, data: Partial<ConfiguracionSistema>): Promise<ConfiguracionSistema>;
    findDtoByEmpresaId(empresaId: number): Promise<ConfiguracionSistema | null>;
    findOne(id: number): Promise<ConfiguracionSistema | null>;
    remove(data: ConfiguracionSistema): Promise<ConfiguracionSistema>;
}

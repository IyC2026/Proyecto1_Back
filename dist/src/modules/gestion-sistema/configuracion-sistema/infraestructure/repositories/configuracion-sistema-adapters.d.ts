import { DataSource, Repository } from 'typeorm';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { IConfiguracionSistemaRepository } from '../../domain/interfaces/configuracion-sistema.repository.interface';
import { ConfiguracionSistema } from '../../domain/entities/configuracion-sistema.entity';
import { CreateConfiguracionSistemaDto } from '../../dto/create-configuracion-sistema.dto';
export declare class ConfiguracionSistemaPersistenceAdapter implements IConfiguracionSistemaRepository {
    private readonly repository;
    private readonly dataSource;
    readonly uow: IUnitOfWork;
    private readonly logger;
    private readonly ENTITY_NAME;
    constructor(repository: Repository<ConfiguracionSistema>, dataSource: DataSource, uow: IUnitOfWork);
    create(data: CreateConfiguracionSistemaDto): Promise<ConfiguracionSistema>;
    findOne(id: number): Promise<ConfiguracionSistema | null>;
    findDtoByEmpresaId(empresaId: number): Promise<ConfiguracionSistema | null>;
    update(id: number, data: Partial<ConfiguracionSistema>): Promise<ConfiguracionSistema>;
    remove(entity: ConfiguracionSistema): Promise<ConfiguracionSistema>;
}

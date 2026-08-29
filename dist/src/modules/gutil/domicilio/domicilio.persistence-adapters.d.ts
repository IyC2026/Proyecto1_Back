import { Repository, DataSource } from "typeorm";
import { IDomicilioRepository } from "./domicilio.repository.interface";
import { Domicilio } from "./entities/domicilio.entity";
export declare class DomicilioPersistenceAdapter implements IDomicilioRepository {
    private readonly repository;
    private readonly dataSource;
    private readonly logger;
    private readonly ENTITY_NAME;
    constructor(repository: Repository<Domicilio>, dataSource: DataSource);
}

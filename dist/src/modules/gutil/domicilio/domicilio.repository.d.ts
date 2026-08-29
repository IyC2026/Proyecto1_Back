import { IDomicilioRepository } from "./domicilio.repository.interface";
import { DomicilioPersistenceAdapter } from "./domicilio.persistence-adapters";
export declare class DomicilioRepository implements IDomicilioRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: DomicilioPersistenceAdapter);
    private readonly ENTITY_NAME;
}

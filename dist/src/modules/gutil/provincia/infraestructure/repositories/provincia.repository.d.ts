import { CreateProvinciaDto } from "../../dto/create-provincia.dto";
import { IProvinciaRepository } from "../../domain/interfaces/provincia.repository.interface";
import { ProvinciaPersistenceAdapter } from "./provincia.pesistence-adapter";
import { Provincia } from "../../domain/entities/provincia.entity";
export declare class ProvinciaRepository implements IProvinciaRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: ProvinciaPersistenceAdapter);
    private readonly ENTITY_NAME;
    create(data: CreateProvinciaDto): Promise<Provincia>;
    update(id: number, data: Partial<Provincia>): Promise<Provincia>;
    findAll(skip?: number, take?: number): Promise<Provincia[]>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<Provincia[]>;
    findAllFor(): Promise<Provincia[]>;
    findOne(id: number): Promise<Provincia | null>;
    findByDenominacion(denominacion: string): Promise<Provincia | null>;
    remove(data: Provincia): Promise<Provincia>;
}

import { DataSource, Repository } from "typeorm";
import { CreateProvinciaDto } from "../../dto/create-provincia.dto";
import { IProvinciaRepository } from "../../domain/interfaces/provincia.repository.interface";
import { IUnitOfWork } from "src/modules/common/unit-of-work/iunit-of-work.";
import { Provincia } from "../../domain/entities/provincia.entity";
export declare class ProvinciaPersistenceAdapter implements IProvinciaRepository {
    private readonly repository;
    private readonly dataSource;
    readonly uow: IUnitOfWork;
    private readonly logger;
    private readonly ENTITY_NAME;
    constructor(repository: Repository<Provincia>, dataSource: DataSource, uow: IUnitOfWork);
    create(data: CreateProvinciaDto): Promise<Provincia>;
    findAll(skip?: number, take?: number): Promise<Provincia[]>;
    findOne(id: number): Promise<Provincia | null>;
    findByDenominacion(denominacion: string): Promise<Provincia | null>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<Provincia[]>;
    findAllFor(): Promise<Provincia[]>;
    update(id: number, data: Partial<Provincia>): Promise<Provincia>;
    remove(entity: Provincia): Promise<Provincia>;
}

import { Repository, DataSource } from "typeorm";
import { IRolRepository } from "../../domain/interfaces/rol-repository.interface";
import { CreateRolDto } from "../../dto/create-rol.dto";
import { Rol } from "../../domain/entities/rol.entity";
export declare class RolPersistenceAdapter implements IRolRepository {
    private readonly repository;
    private readonly dataSource;
    private readonly logger;
    private readonly ENTITY_NAME;
    constructor(repository: Repository<Rol>, dataSource: DataSource);
    create(data: CreateRolDto): Promise<Rol>;
    findAll(skip?: number, take?: number): Promise<Rol[]>;
    findOne(id: number): Promise<Rol | null>;
    findByDenominacion(denominacion: string): Promise<Rol | null>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<Rol[]>;
    update(id: number, data: Partial<Rol>): Promise<Rol>;
    remove(id: number): Promise<Rol>;
    findByIds(ids: number[]): Promise<Rol[]>;
}

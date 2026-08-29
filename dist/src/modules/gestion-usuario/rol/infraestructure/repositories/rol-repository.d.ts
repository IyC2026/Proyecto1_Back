import { CreateRolDto } from "../../dto/create-rol.dto";
import { UpdateRolDto } from "../../dto/update-rol.dto";
import { Rol } from "../../domain/entities/rol.entity";
import { IRolRepository } from "../../domain/interfaces/rol-repository.interface";
import { RolPersistenceAdapter } from "./rol-persistence-adapters";
export declare class RolRepository implements IRolRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: RolPersistenceAdapter);
    private readonly ENTITY_NAME;
    create(data: CreateRolDto): Promise<Rol>;
    update(id: number, data: UpdateRolDto): Promise<Rol>;
    findAll(skip?: number, take?: number): Promise<Rol[]>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<Rol[]>;
    findOne(id: number): Promise<Rol | null>;
    findByDenominacion(denominacion: string): Promise<Rol | null>;
    remove(id: number): Promise<Rol>;
    findByIds(ids: number[]): Promise<Rol[]>;
}

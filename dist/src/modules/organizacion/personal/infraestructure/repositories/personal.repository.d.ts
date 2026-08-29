import { IPersonalRepository } from "../../domain/interfaces/personal.interface";
import { PersonalPersistenceAdapter } from "./personal.persistence-adapters";
import { Personal } from "../../domain/entities/personal.entity";
import { CreatePersonalDto } from "../../dto/create-personal.dto";
import { UpdatePersonalDto } from "../../dto/update-personal.dto";
import { Usuario } from "src/modules/gestion-usuario/usuario/domain/entities/usuario.entity";
export declare class PersonalRepository implements IPersonalRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: PersonalPersistenceAdapter);
    private readonly ENTITY_NAME;
    create(data: CreatePersonalDto, usuario: Usuario): Promise<Personal>;
    findAllFor(denominacion: string): Promise<Personal[]>;
    update(id: number, data: UpdatePersonalDto, usuario: Usuario): Promise<Personal>;
    findAll(skip?: number, take?: number): Promise<Personal[]>;
    findAllListado(): Promise<Personal[]>;
    findBy(denominacion: string, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: Personal[];
        total: number;
    }>;
    findOne(id: number): Promise<Personal | null>;
    findByIdConAuditoria(id: number): Promise<Personal | null>;
    findByDenominacion(denominacion: string): Promise<Personal | null>;
    findAllVendedorFor(denominacion: string): Promise<Personal[]>;
    remove(id: number): Promise<Personal>;
}

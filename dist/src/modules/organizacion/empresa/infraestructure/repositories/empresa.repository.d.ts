import { CreateEmpresaDto } from "../../dto/create-empresa.dto";
import { UpdateEmpresaDto } from "../../dto/update-empresa.dto";
import { Empresa } from "../../domain/entities/empresa.entity";
import { IEmpresaRepository } from "../../domain/interfaces/empresa.interface";
import { EmpresaPersistenceAdapter } from "./empresa.persistence-adapters";
import { CondicionIva } from "src/modules/gutil/condicion-iva/domain/entities/condicion-iva.entity";
export declare class EmpresaRepository implements IEmpresaRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: EmpresaPersistenceAdapter);
    private readonly ENTITY_NAME;
    create(data: CreateEmpresaDto, categoriaIVA: CondicionIva): Promise<Empresa>;
    update(id: number, data: UpdateEmpresaDto, categoriaIVA: CondicionIva): Promise<Empresa>;
    findAll(skip?: number, take?: number): Promise<Empresa[]>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<Empresa[]>;
    findOne(id: number): Promise<Empresa | null>;
    findOneWithRelations(id: number): Promise<Empresa | null>;
    findByDenominacion(denominacion: string): Promise<Empresa | null>;
    remove(id: number): Promise<Empresa>;
    empresaExist(empresaId: number): Promise<boolean>;
}

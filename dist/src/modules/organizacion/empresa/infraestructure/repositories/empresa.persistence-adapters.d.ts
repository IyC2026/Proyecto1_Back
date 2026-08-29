import { DataSource, Repository } from 'typeorm';
import { IEmpresaRepository } from '../../domain/interfaces/empresa.interface';
import { CreateEmpresaDto } from '../../dto/create-empresa.dto';
import { UpdateEmpresaDto } from '../../dto/update-empresa.dto';
import { Empresa } from '../../domain/entities/empresa.entity';
import { CondicionIva } from 'src/modules/gutil/condicion-iva/domain/entities/condicion-iva.entity';
export declare class EmpresaPersistenceAdapter implements IEmpresaRepository {
    private readonly repository;
    private readonly dataSource;
    private readonly logger;
    private readonly ENTITY_NAME;
    constructor(repository: Repository<Empresa>, dataSource: DataSource);
    create(data: CreateEmpresaDto, condicionIva: CondicionIva): Promise<Empresa>;
    findAll(skip?: number, take?: number): Promise<Empresa[]>;
    findOne(id: number): Promise<Empresa | null>;
    findOneWithRelations(id: number): Promise<Empresa | null>;
    findByDenominacion(denominacion: string): Promise<Empresa | null>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<Empresa[]>;
    update(id: number, data: UpdateEmpresaDto, condicionIva: CondicionIva): Promise<Empresa>;
    remove(id: number): Promise<Empresa>;
    empresaExist(empresaId: number): Promise<boolean>;
}

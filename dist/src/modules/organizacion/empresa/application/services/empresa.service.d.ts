import { CreateEmpresaDto } from '../../dto/create-empresa.dto';
import { UpdateEmpresaDto } from '../../dto/update-empresa.dto';
import { Empresa } from '../../domain/entities/empresa.entity';
import { IEmpresaRepository } from '../../domain/interfaces/empresa.interface';
import { CondicionIvaService } from 'src/modules/gutil/condicion-iva/application/services/condicion-iva.service';
export declare class EmpresaService {
    private readonly repository;
    private readonly condicionIvaService;
    private readonly logger;
    constructor(repository: IEmpresaRepository, condicionIvaService: CondicionIvaService);
    private readonly ENTITY_NAME;
    create(dto: CreateEmpresaDto): Promise<Empresa>;
    update(id: number, dto: UpdateEmpresaDto): Promise<Empresa>;
    findAll(skip?: number, take?: number): Promise<Empresa[]>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<Empresa[]>;
    findOne(id: number): Promise<Empresa>;
    findOneWithRelations(id: number): Promise<Empresa>;
    remove(id: number): Promise<Empresa>;
    private checkDenominacionExists;
    empresaExist(empresaId: number): Promise<boolean>;
}

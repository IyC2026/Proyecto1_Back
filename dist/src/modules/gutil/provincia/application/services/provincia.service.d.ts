import { CreateProvinciaDto } from '../../dto/create-provincia.dto';
import { UpdateProvinciaDto } from '../../dto/update-provincia.dto';
import { IProvinciaRepository } from '../../domain/interfaces/provincia.repository.interface';
import { ListadoConTotalDto } from 'src/modules/common/interface/listadoConTotalDto';
import { ProvinciaDto } from '../../dto/provincia.dto';
export declare class ProvinciaService {
    private readonly repository;
    private readonly logger;
    constructor(repository: IProvinciaRepository);
    private readonly ENTITY_NAME;
    create(dto: CreateProvinciaDto): Promise<import("../../domain/entities/provincia.entity").Provincia>;
    update(id: number, dto: UpdateProvinciaDto): Promise<import("../../domain/entities/provincia.entity").Provincia>;
    findAll(skip?: number, take?: number): Promise<import("../../domain/entities/provincia.entity").Provincia[]>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<import("../../domain/entities/provincia.entity").Provincia[]>;
    findAllFor(): Promise<ListadoConTotalDto<ProvinciaDto>>;
    findOne(id: number): Promise<import("../../domain/entities/provincia.entity").Provincia>;
    remove(id: number): Promise<import("../../domain/entities/provincia.entity").Provincia>;
    private checkDenominacionExists;
}

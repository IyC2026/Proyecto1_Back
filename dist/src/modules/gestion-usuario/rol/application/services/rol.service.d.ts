import { IRolRepository } from '../../domain/interfaces/rol-repository.interface';
import { CreateRolDto } from '../../dto/create-rol.dto';
import { UpdateRolDto } from '../../dto/update-rol.dto';
import { Rol } from '../../domain/entities/rol.entity';
export declare class RolService {
    private readonly repository;
    private readonly logger;
    constructor(repository: IRolRepository);
    private readonly ENTITY_NAME;
    create(dto: CreateRolDto): Promise<Rol>;
    update(id: number, dto: UpdateRolDto): Promise<Rol>;
    findAll(skip?: number, take?: number): Promise<Rol[]>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<Rol[]>;
    findOne(id: number): Promise<Rol>;
    remove(id: number): Promise<Rol>;
    private checkDenominacionExists;
    findByIds(ids: number[]): Promise<Rol[]>;
}

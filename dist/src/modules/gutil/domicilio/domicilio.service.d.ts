import { UpdateDomicilioDto } from './dto/update-domicilio.dto';
import { Localidad } from '../localidad/domain/entities/localidad.entity';
import { Domicilio } from './entities/domicilio.entity';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
export declare class DomicilioService {
    private readonly logger;
    create(uow: IUnitOfWork, ciudad: Localidad, direccion: string, usuarioCreatedId: number): Promise<Domicilio>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDomicilioDto: UpdateDomicilioDto): string;
    remove(id: number): string;
}

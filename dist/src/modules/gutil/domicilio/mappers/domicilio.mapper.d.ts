import { Domicilio } from '../entities/domicilio.entity';
import { DomicilioDto } from '../dto/domicilio.dto';
export declare class DomicilioMapper {
    static toDto(entity: Domicilio): DomicilioDto;
    static toString(entity: Domicilio): string;
}

import { PersonalSearchDto } from '../dto/personal-search.dto';
import { PersonalDto } from '../dto/personal.dto';
import { Personal } from '../domain/entities/personal.entity';
export declare class PersonalMapper {
    static toSearchDto(entity: Personal): PersonalSearchDto;
    static toDto(personal: Personal): PersonalDto;
}

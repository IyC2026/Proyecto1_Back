import { DomicilioService } from './domicilio.service';
import { CreateDomicilioDto } from './dto/create-domicilio.dto';
import { UpdateDomicilioDto } from './dto/update-domicilio.dto';
export declare class DomicilioController {
    private readonly domicilioService;
    constructor(domicilioService: DomicilioService);
    create(createDomicilioDto: CreateDomicilioDto): void;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDomicilioDto: UpdateDomicilioDto): string;
    remove(id: string): string;
}

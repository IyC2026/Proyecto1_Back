import { BusquedasService } from './busquedas.service';
import { SearchBusquedaGenericoDto } from './dto/search-busqueda-generico.dto';
export declare class BusquedasController {
    private readonly service;
    constructor(service: BusquedasService);
    findBy(paginationDto: SearchBusquedaGenericoDto): Promise<any>;
}

import { CondicionIvaService } from 'src/modules/gutil/condicion-iva/application/services/condicion-iva.service';
import { CondicionIvaValidable } from '../domain/interfaces/condicion-iva-validable.inteface';
import { CondicionIva } from '../domain/entities/condicion-iva.entity';
export declare class CondicionIvaValidationHelper {
    private readonly condicionIvaService;
    constructor(condicionIvaService: CondicionIvaService);
    validateAndGetCondicionIva(condicionIvaId: number): Promise<CondicionIva>;
    validateCondicionIvaRequirements(categoriaIVA: CondicionIva, dto: CondicionIvaValidable): void;
    private isValidCuit;
}

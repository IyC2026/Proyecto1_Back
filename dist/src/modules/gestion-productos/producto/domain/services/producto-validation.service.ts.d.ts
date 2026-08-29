import { Linea } from 'src/modules/gestion-productos/linea/domain/entities/linea.entity';
import { Marca } from 'src/modules/gestion-productos/marca/domain/entities/marca.entity';
export declare class ProductoValidationService {
    validarEntidadesRelacionadas(marca: Marca, linea: Linea): void;
    private validarEntidadNoEsDeSistema;
}

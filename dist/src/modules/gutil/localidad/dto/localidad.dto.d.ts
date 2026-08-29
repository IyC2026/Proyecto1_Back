import { ReferenciaDto } from 'src/modules/common/dto/referencia.dto';
export declare class LocalidadDto {
    id: number;
    denominacion: string;
    codigoPostal: string;
    sistema: number;
    provincia: ReferenciaDto;
    deletedAt: string | null;
}

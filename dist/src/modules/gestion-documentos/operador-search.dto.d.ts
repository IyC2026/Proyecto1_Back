import { ReferenciaDto } from '../common/dto/referencia.dto';
export declare class OperadorSearchDto {
    id: number;
    denominacion: string;
    codigo: string;
    denominacionAfip: string;
    observacion: string;
    letra: string;
    cuit: string;
    dni: string;
    domicilioString: string;
    condicionIva: string;
    saldo: number;
    sistema: number;
    vendedor: ReferenciaDto;
    esProveedorMateriaPrima?: boolean;
    esProveedorGastos?: boolean;
}

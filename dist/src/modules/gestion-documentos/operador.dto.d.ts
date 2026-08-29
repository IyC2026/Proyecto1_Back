import { DomicilioDto } from '../gutil/domicilio/dto/domicilio.dto';
import { ReferenciaDto } from '../common/dto/referencia.dto';
import { CondicionIvaDto } from '../gutil/condicion-iva/dto/condicion-iva.dto';
export declare class OperadorDto {
    id: number;
    denominacion: string;
    codigo: string;
    denominacionAfip: string;
    observacion: string;
    letra: string;
    cuit: string;
    dni: string;
    mail: string;
    condicionIva: CondicionIvaDto;
    vendedor?: ReferenciaDto;
    domicilio?: DomicilioDto;
    domicilioString: string;
    saldo: number;
    sistema: number;
}

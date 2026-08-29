import { ReferenciaDto } from 'src/modules/common/dto/referencia.dto';
import { CreateDomicilioDto } from 'src/modules/gutil/domicilio/dto/create-domicilio.dto';
export declare class ClienteDto {
    denominacion: string;
    denominacionAfip?: string;
    cuit?: string;
    dni?: string;
    condicionIva: ReferenciaDto;
    personal: ReferenciaDto;
    domicilio: CreateDomicilioDto;
    domicilioString: string;
    requiereCuit: boolean;
    celular?: string;
    contactoNombre?: string | null;
    contactoCargo?: string | null;
    requiereDocumento: boolean;
    observacion?: string;
    createdAt: Date;
    usuarioCreatedId: number;
}

import { CondicionIvaValidable } from 'src/modules/gutil/condicion-iva/domain/interfaces/condicion-iva-validable.inteface';
import { CreateDomicilioDto } from 'src/modules/gutil/domicilio/dto/create-domicilio.dto';
export declare class CreateClienteDto implements CondicionIvaValidable {
    denominacion: string;
    denominacionAfip?: string;
    codigo?: string;
    cuit?: string;
    dni?: string;
    condicionIvaId: number;
    vendedorId: number;
    domicilio: CreateDomicilioDto;
    mail?: string;
    celular?: string;
    contactoNombre?: string | null;
    contactoCargo?: string | null;
    observacion?: string;
    createdAt: Date;
    usuarioCreatedId: number;
}

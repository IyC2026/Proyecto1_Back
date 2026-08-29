import { CondicionIvaValidable } from 'src/modules/gutil/condicion-iva/domain/interfaces/condicion-iva-validable.inteface';
import { CreateDomicilioDto } from 'src/modules/gutil/domicilio/dto/create-domicilio.dto';
export declare class CreateProveedorDto implements CondicionIvaValidable {
    codigoProveedor?: string;
    denominacion: string;
    denominacionAfip?: string;
    cuit?: string;
    condicionIvaId: number;
    domicilio: CreateDomicilioDto;
    esProveedorMateriaPrima: boolean;
    esProveedorGastos: boolean;
    mail?: string;
    observacion?: string;
    createdAt: Date;
    usuarioCreatedId: number;
}

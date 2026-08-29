import { CreateClienteDto } from './create-cliente.dto';
import { UpdateDomicilioDto } from 'src/modules/gutil/domicilio/dto/update-domicilio.dto';
import { CondicionIvaValidable } from 'src/modules/gutil/condicion-iva/domain/interfaces/condicion-iva-validable.inteface';
declare const CreateClienteDtoSinDomicilio_base: import("@nestjs/mapped-types").MappedType<Omit<CreateClienteDto, "domicilio">>;
declare class CreateClienteDtoSinDomicilio extends CreateClienteDtoSinDomicilio_base {
}
declare const UpdateClienteDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateClienteDtoSinDomicilio>>;
export declare class UpdateClienteDto extends UpdateClienteDto_base implements CondicionIvaValidable {
    condicionIvaId: number;
    domicilio: UpdateDomicilioDto;
    vendedorId: number;
    updatedAt: Date;
    usuarioUpdatedId: number;
}
export {};

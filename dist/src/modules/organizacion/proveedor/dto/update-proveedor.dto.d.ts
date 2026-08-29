import { CreateProveedorDto } from './create-proveedor.dto';
import { UpdateDomicilioDto } from 'src/modules/gutil/domicilio/dto/update-domicilio.dto';
import { CondicionIvaValidable } from 'src/modules/gutil/condicion-iva/domain/interfaces/condicion-iva-validable.inteface';
declare const CreateProveedorDtoSinDomicilio_base: import("@nestjs/mapped-types").MappedType<Omit<CreateProveedorDto, "domicilio">>;
declare class CreateProveedorDtoSinDomicilio extends CreateProveedorDtoSinDomicilio_base {
}
declare const UpdateProveedorDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProveedorDtoSinDomicilio>>;
export declare class UpdateProveedorDto extends UpdateProveedorDto_base implements CondicionIvaValidable {
    condicionIvaId: number;
    domicilio: UpdateDomicilioDto;
    updatedAt: Date;
    usuarioUpdatedId: number;
}
export {};

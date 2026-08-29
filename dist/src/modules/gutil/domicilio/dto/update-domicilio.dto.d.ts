import { CreateDomicilioDto } from './create-domicilio.dto';
declare const UpdateDomicilioDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDomicilioDto>>;
export declare class UpdateDomicilioDto extends UpdateDomicilioDto_base {
    direccion?: string;
    localidadId?: number;
}
export {};

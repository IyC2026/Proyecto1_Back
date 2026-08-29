import { CreateCondicionIvaDto } from './create-condicion-iva.dto';
declare const UpdateCondicionIvaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCondicionIvaDto>>;
export declare class UpdateCondicionIvaDto extends UpdateCondicionIvaDto_base {
    updatedAt: Date;
    usuarioUpdatedId: number;
}
export {};

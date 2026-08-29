import { CreateProductoDto } from './create-producto.dto';
declare const UpdateProductoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductoDto>>;
export declare class UpdateProductoDto extends UpdateProductoDto_base {
    denominacion: string;
    usuarioUpdatedId: number;
    updatedAt: Date;
}
export {};

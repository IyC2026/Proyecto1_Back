import { CreateLineaDto } from './create-linea.dto';
declare const UpdateLineaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateLineaDto>>;
export declare class UpdateLineaDto extends UpdateLineaDto_base {
    utilizaStockMinimo: boolean;
    updatedAt: Date;
    usuarioUpdatedId: number;
}
export {};

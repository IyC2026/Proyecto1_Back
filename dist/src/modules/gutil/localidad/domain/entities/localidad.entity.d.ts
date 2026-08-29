import { Provincia } from "src/modules/gutil/provincia/domain/entities/provincia.entity";
export declare class Localidad {
    id: number;
    denominacion: string;
    codigoPostal?: string | null;
    provincia: Provincia;
    provinciaId?: number;
    observacion?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    usuarioCreatedId?: number;
    usuarioDeletedId?: number;
    usuarioUpdatedId?: number;
    sistema: number;
}

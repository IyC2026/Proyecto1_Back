import { Localidad } from "../../../localidad/domain/entities/localidad.entity";
export declare class Provincia {
    id: number;
    denominacion: string;
    observacion?: string;
    localidades: Localidad[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    usuarioCreatedId?: number;
    usuarioDeletedId?: number;
    usuarioUpdatedId?: number;
}

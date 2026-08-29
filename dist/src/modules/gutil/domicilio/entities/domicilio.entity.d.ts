import { Localidad } from "../../localidad/domain/entities/localidad.entity";
import { Personal } from "src/modules/organizacion/personal/domain/entities/personal.entity";
import { Cliente } from "src/modules/organizacion/cliente/domain/entities/cliente.entity";
import { Proveedor } from "src/modules/organizacion/proveedor/domain/entities/proveedor.entity";
export declare class Domicilio {
    id: number;
    direccion?: string;
    localidad: Localidad;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    usuarioCreatedId?: number;
    usuarioUpdatedId?: number;
    usuarioDeletedId?: number;
    clientes: Cliente[];
    proveedores: Proveedor[];
    personales: Personal[];
}

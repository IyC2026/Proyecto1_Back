import { Cliente } from 'src/modules/organizacion/cliente/domain/entities/cliente.entity';
import { Proveedor } from 'src/modules/organizacion/proveedor/domain/entities/proveedor.entity';
export declare class CondicionIva {
    id: number;
    denominacion: string;
    letra: string;
    tipoCondicionIvaReceptor: number;
    observacion?: string;
    requiereCuit: boolean;
    requiereDocumento: boolean;
    clientes: Cliente[];
    proveedores: Proveedor[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    usuarioCreatedId?: number;
    usuarioDeletedId?: number;
    usuarioUpdatedId?: number;
    sistema: number;
}

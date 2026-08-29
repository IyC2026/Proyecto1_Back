import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { Domicilio } from 'src/modules/gutil/domicilio/entities/domicilio.entity';
import { Cliente } from 'src/modules/organizacion/cliente/domain/entities/cliente.entity';
export declare class Personal {
    id: number;
    denominacion: string;
    mail: string;
    observacion?: string;
    esVendedor: boolean;
    domicilio: Domicilio;
    clientes: Cliente[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    usuarioCreated: Usuario;
    usuarioUpdated: Usuario;
    usuarioDeleted: Usuario;
    sistema: number;
    usuario?: Usuario;
    usuarioId?: number;
}

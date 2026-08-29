import { Rol } from '../../../rol/domain/entities/rol.entity';
import { Personal } from 'src/modules/organizacion/personal/domain/entities/personal.entity';
export declare class Usuario {
    id: number;
    mail: string;
    contrasena: string;
    denominacion: string;
    activo: boolean;
    roles: Rol[];
    personal?: Personal;
    personalId?: number;
    codigoRecuperacion: string;
    codigoExpira: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    usuarioCreatedId?: number;
    usuarioDeletedId?: number;
    usuarioUpdatedId?: number;
}

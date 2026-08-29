import { ProveedorOperacion } from '../../../proveedor-operacion/entities/proveedor-operacion.entity';
import { Domicilio } from 'src/modules/gutil/domicilio/entities/domicilio.entity';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { CondicionIva } from 'src/modules/gutil/condicion-iva/domain/entities/condicion-iva.entity';
export declare class Proveedor {
    id: number;
    codigoProveedor: string;
    denominacion: string;
    denominacionAfip?: string;
    cuit?: string | null;
    domicilio: Domicilio;
    observacion?: string;
    condicionIvaId?: number;
    condicionIva: CondicionIva;
    esProveedorMateriaPrima: boolean;
    esProveedorGastos: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    usuarioCreated: Usuario;
    usuarioUpdated: Usuario;
    usuarioDeleted: Usuario;
    proveedoresOperacion: ProveedorOperacion[];
    sistema: number;
}

import { EmpresaOperacion } from '../../../empresa-operacion/entities/empresa-operacion.entity';
import { CondicionIva } from 'src/modules/gutil/condicion-iva/domain/entities/condicion-iva.entity';
export declare class Empresa {
    id: number;
    denominacion: string;
    cuit?: string | null;
    condicionIva: CondicionIva;
    domicilio?: string;
    telefono?: string;
    email?: string;
    fechaInicioActividad?: string;
    ingresosBrutos?: string;
    observacion?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    usuarioCreatedId?: number;
    usuarioDeletedId?: number;
    usuarioUpdatedId?: number;
    empresasOperacion: EmpresaOperacion[];
}

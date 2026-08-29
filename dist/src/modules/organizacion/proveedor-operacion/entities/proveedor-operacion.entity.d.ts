import { Proveedor } from '../../proveedor/domain/entities/proveedor.entity';
export declare class ProveedorOperacion {
    id: number;
    proveedor: Proveedor;
    operacionId: number;
    tipoOperacion: string;
    creadoEn: Date;
}

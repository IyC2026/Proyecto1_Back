import { Producto } from "../../producto/domain/entities/producto.entity";
export declare class ProductoOperacion {
    id: number;
    producto: Producto;
    operacionId: number;
    tipoOperacion: string;
    creadoEn: Date;
}

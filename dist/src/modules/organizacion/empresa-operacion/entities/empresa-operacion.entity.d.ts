import { Empresa } from "../../empresa/domain/entities/empresa.entity";
export declare class EmpresaOperacion {
    id: number;
    empresa: Empresa;
    operacionId: number;
    tipoOperacion: string;
    creadoEn: Date;
}

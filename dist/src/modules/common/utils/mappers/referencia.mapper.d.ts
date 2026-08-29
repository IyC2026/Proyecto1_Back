export interface ReferenciaDto {
    id: number;
    denominacion: string;
}
export declare function toReferenciaDto<T extends {
    id: number;
    denominacion: string;
}>(entity?: T): ReferenciaDto;
export declare function toReferenciaDtoOrEmpty<T extends {
    id: number;
    denominacion: string;
}>(entity?: T | null): ReferenciaDto;

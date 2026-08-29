export declare class BusquedasService {
    private readonly estrategias;
    constructor();
    findByFiltered(tipoDocumento: number, fechaDesde: Date, fechaHasta: Date, empresaId: number, operadorId: number, skip: number, take: number): Promise<any>;
}

export declare const CAMPOS_ULTIMA_FECHA: {
    readonly PEDIDO: "ultimoPedido";
    readonly FACTURA: "ultimoFactura";
    readonly RECIBO: "ultimoRecibo";
};
export type CampoUltimaFecha = typeof CAMPOS_ULTIMA_FECHA[keyof typeof CAMPOS_ULTIMA_FECHA];

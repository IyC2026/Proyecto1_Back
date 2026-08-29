export declare enum TipoPersonalN {
    ADMINISTRADOR = 1,
    EMPLEADO = 2,
    REPOSITOR = 3,
    VENDEDOR = 4,
    ROOT = 5,
    REPARTIDOR = 6,
    COBRADOR = 7
}
export declare enum TipoPersonal {
    ADMINISTRADOR = "ADMINISTRADOR",
    EMPLEADO = "EMPLEADO",
    REPOSITOR = "REPOSITOR",
    VENDEDOR = "VENDEDOR",
    ROOT = "ROOT",
    REPARTIDOR = "REPARTIDOR",
    COBRADOR = "COBRADOR"
}
export declare function mapearPersonalANumero(tipo: TipoPersonal): TipoPersonalN;

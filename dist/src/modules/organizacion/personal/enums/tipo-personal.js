"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoPersonal = exports.TipoPersonalN = void 0;
exports.mapearPersonalANumero = mapearPersonalANumero;
var TipoPersonalN;
(function (TipoPersonalN) {
    TipoPersonalN[TipoPersonalN["ADMINISTRADOR"] = 1] = "ADMINISTRADOR";
    TipoPersonalN[TipoPersonalN["EMPLEADO"] = 2] = "EMPLEADO";
    TipoPersonalN[TipoPersonalN["REPOSITOR"] = 3] = "REPOSITOR";
    TipoPersonalN[TipoPersonalN["VENDEDOR"] = 4] = "VENDEDOR";
    TipoPersonalN[TipoPersonalN["ROOT"] = 5] = "ROOT";
    TipoPersonalN[TipoPersonalN["REPARTIDOR"] = 6] = "REPARTIDOR";
    TipoPersonalN[TipoPersonalN["COBRADOR"] = 7] = "COBRADOR";
})(TipoPersonalN || (exports.TipoPersonalN = TipoPersonalN = {}));
var TipoPersonal;
(function (TipoPersonal) {
    TipoPersonal["ADMINISTRADOR"] = "ADMINISTRADOR";
    TipoPersonal["EMPLEADO"] = "EMPLEADO";
    TipoPersonal["REPOSITOR"] = "REPOSITOR";
    TipoPersonal["VENDEDOR"] = "VENDEDOR";
    TipoPersonal["ROOT"] = "ROOT";
    TipoPersonal["REPARTIDOR"] = "REPARTIDOR";
    TipoPersonal["COBRADOR"] = "COBRADOR";
})(TipoPersonal || (exports.TipoPersonal = TipoPersonal = {}));
function mapearPersonalANumero(tipo) {
    return TipoPersonalN[tipo];
}
//# sourceMappingURL=tipo-personal.js.map
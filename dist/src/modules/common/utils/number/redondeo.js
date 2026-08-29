"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redondear = exports.redondear5 = exports.redondear3 = exports.redondear2 = void 0;
const redondear2 = (valor) => {
    return Math.round(valor * 100) / 100;
};
exports.redondear2 = redondear2;
const redondear3 = (valor) => {
    return Math.round(valor * 1000) / 1000;
};
exports.redondear3 = redondear3;
const redondear5 = (valor) => {
    return Math.round(valor * 100000) / 100000;
};
exports.redondear5 = redondear5;
const redondear = (valor, decimales = 2) => {
    const factor = 10 ** decimales;
    return Math.round((valor + Number.EPSILON) * factor) / factor;
};
exports.redondear = redondear;
//# sourceMappingURL=redondeo.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularPrecioConIva = exports.calcularPrecioSinIva = exports.obtenerDivisorIva = void 0;
const redondeo_1 = require("./number/redondeo");
const obtenerDivisorIva = (porcentajeIva) => {
    return 1 + porcentajeIva / 100;
};
exports.obtenerDivisorIva = obtenerDivisorIva;
const calcularPrecioSinIva = (precioConIva, porcentajeIva) => {
    const divisor = (0, exports.obtenerDivisorIva)(porcentajeIva);
    return (0, redondeo_1.redondear5)(precioConIva / divisor);
};
exports.calcularPrecioSinIva = calcularPrecioSinIva;
const calcularPrecioConIva = (precioSinIva, porcentajeIva) => {
    const multiplicador = (0, exports.obtenerDivisorIva)(porcentajeIva);
    return (0, redondeo_1.redondear5)(precioSinIva * multiplicador);
};
exports.calcularPrecioConIva = calcularPrecioConIva;
//# sourceMappingURL=precios.js.map
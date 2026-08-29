"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFrontUtils = void 0;
class MessageFrontUtils {
    static create(mensaje) {
        return { mensaje };
    }
    static eliminarItem(mensaje, total) {
        return { mensaje, total };
    }
    static createdItem(mensaje, total) {
        return { mensaje, total };
    }
    static createSimple(nombre, denominacion, accion) {
        return this.create(`${nombre} ${accion} con éxito con denominacion: ${denominacion}`);
    }
    static createSimple2(nombre, numeroDocumento, cambioEstado) {
        return this.create(`${nombre} ${numeroDocumento} a cambiado de ${cambioEstado} con éxito `);
    }
    static createActualizacionPrecioMasiva(denominacion) {
        return this.create(` La actualización de precios masiva se realizo : ${denominacion}`);
    }
    static create2(nombre) {
        return this.create(`${nombre}  con éxito`);
    }
}
exports.MessageFrontUtils = MessageFrontUtils;
//# sourceMappingURL=message-front.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FechaUtils = void 0;
exports.FechaUtils = {
    formatFechaHora(fecha) {
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const hora = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        return `${dia}/${mes}/${anio} ${hora}:${minutos}`;
    },
    formatFecha(fecha) {
        if (!fecha)
            return '';
        const f = new Date(fecha);
        const dia = f.getDate().toString().padStart(2, '0');
        const mes = (f.getMonth() + 1).toString().padStart(2, '0');
        const anio = f.getFullYear();
        return `${dia}/${mes}/${anio}`;
    },
    formatearFechaUtC(fecha) {
        if (!fecha)
            return '';
        const f = new Date(fecha);
        const dia = f.getUTCDate().toString().padStart(2, '0');
        const mes = (f.getUTCMonth() + 1).toString().padStart(2, '0');
        const anio = f.getUTCFullYear();
        return `${dia}/${mes}/${anio}`;
    },
    getFechaLocal() {
        const ahora = new Date();
        const offsetMs = 3 * 60 * 60 * 1000;
        return new Date(ahora.getTime() - offsetMs);
    },
};
//# sourceMappingURL=fecha-utils.js.map
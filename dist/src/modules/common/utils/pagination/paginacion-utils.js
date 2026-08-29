"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginacionUtils = void 0;
exports.PaginacionUtils = {
    totalPaginas(totalRegistros, cantidadPorPagina) {
        const total = Math.ceil(totalRegistros / cantidadPorPagina);
        return total;
    },
    totalItems(totalRegistros) {
        return totalRegistros;
    },
};
//# sourceMappingURL=paginacion-utils.js.map
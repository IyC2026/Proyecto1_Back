"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarFechaRango = validarFechaRango;
const common_1 = require("@nestjs/common");
function validarFechaRango(fechaDocumento, mesesAntes = 1) {
    const fechaActual = new Date();
    if (fechaDocumento > fechaActual) {
        throw new common_1.BadRequestException('La fecha del documento no puede ser mayor a la fecha actual');
    }
    const fechaLimite = new Date(fechaActual);
    fechaLimite.setMonth(fechaActual.getMonth() - mesesAntes);
    if (fechaDocumento < fechaLimite) {
        throw new common_1.BadRequestException(`La fecha del documento no puede ser inferior a ${mesesAntes} mes(es) de la fecha actual`);
    }
}
//# sourceMappingURL=fecha-documento.validator.helpers.js.map
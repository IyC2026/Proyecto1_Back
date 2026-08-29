"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusquedasService = void 0;
const common_1 = require("@nestjs/common");
let BusquedasService = class BusquedasService {
    constructor() {
    }
    async findByFiltered(tipoDocumento, fechaDesde, fechaHasta, empresaId, operadorId, skip, take) {
        const estrategia = this.estrategias[tipoDocumento];
        if (!estrategia) {
            throw new Error('Tipo de documento no soportado aún');
        }
        return estrategia(fechaDesde, fechaHasta, empresaId, operadorId, skip, take);
    }
};
exports.BusquedasService = BusquedasService;
exports.BusquedasService = BusquedasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BusquedasService);
//# sourceMappingURL=busquedas.service.js.map
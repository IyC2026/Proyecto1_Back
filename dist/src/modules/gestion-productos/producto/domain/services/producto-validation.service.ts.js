"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoValidationService = void 0;
const common_1 = require("@nestjs/common");
let ProductoValidationService = class ProductoValidationService {
    validarEntidadesRelacionadas(marca, linea) {
        this.validarEntidadNoEsDeSistema(marca, 'Marca');
        this.validarEntidadNoEsDeSistema(linea, 'Línea');
    }
    validarEntidadNoEsDeSistema(entidad, tipo) {
        if (entidad.sistema === 1) {
            throw new common_1.BadRequestException(`${tipo} ${entidad.id} está marcada como del sistema y no puede usarse`);
        }
    }
};
exports.ProductoValidationService = ProductoValidationService;
exports.ProductoValidationService = ProductoValidationService = __decorate([
    (0, common_1.Injectable)()
], ProductoValidationService);
//# sourceMappingURL=producto-validation.service.ts.js.map
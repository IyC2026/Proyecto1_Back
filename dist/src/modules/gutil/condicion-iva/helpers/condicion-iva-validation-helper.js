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
exports.CondicionIvaValidationHelper = void 0;
const common_1 = require("@nestjs/common");
const condicion_iva_service_1 = require("../application/services/condicion-iva.service");
let CondicionIvaValidationHelper = class CondicionIvaValidationHelper {
    constructor(condicionIvaService) {
        this.condicionIvaService = condicionIvaService;
    }
    async validateAndGetCondicionIva(condicionIvaId) {
        const categoriaIVA = await this.condicionIvaService.findEntityById(condicionIvaId);
        if (!categoriaIVA) {
            throw new common_1.NotFoundException(`Condición IVA con ID ${condicionIvaId} no encontrada`);
        }
        return categoriaIVA;
    }
    validateCondicionIvaRequirements(categoriaIVA, dto) {
        if (categoriaIVA.requiereCuit) {
            if (!dto.cuit) {
                throw new common_1.BadRequestException({
                    error: 'CUIT requerido',
                    message: `La condición IVA '${categoriaIVA.denominacion}' requiere un CUIT.`,
                });
            }
            if (!this.isValidCuit(dto.cuit)) {
                throw new common_1.BadRequestException({
                    error: 'CUIT inválido',
                    message: `El CUIT proporcionado no es válido.`,
                });
            }
        }
        if (categoriaIVA.requiereDocumento && !dto.dni) {
            throw new common_1.BadRequestException({
                error: 'DNI requerido',
                message: `La condición IVA '${categoriaIVA.denominacion}' requiere DNI.`,
            });
        }
    }
    isValidCuit(cuit) {
        if (!cuit || cuit.length !== 11 || !/^\d+$/.test(cuit)) {
            return false;
        }
        const digits = cuit.split('').map(Number);
        const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
        const sum = digits
            .slice(0, 10)
            .reduce((acc, digit, i) => acc + digit * weights[i], 0);
        const checksum = (11 - (sum % 11)) % 11;
        return checksum === digits[10];
    }
};
exports.CondicionIvaValidationHelper = CondicionIvaValidationHelper;
exports.CondicionIvaValidationHelper = CondicionIvaValidationHelper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [condicion_iva_service_1.CondicionIvaService])
], CondicionIvaValidationHelper);
//# sourceMappingURL=condicion-iva-validation-helper.js.map
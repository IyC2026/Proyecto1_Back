"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoIntrinsicValidationService = void 0;
const common_1 = require("@nestjs/common");
let ProductoIntrinsicValidationService = class ProductoIntrinsicValidationService {
    validarDatosBasicos(datos) {
        this.validarDenominacion(datos.denominacion);
        this.validarIds(datos.marcaId, datos.lineaId);
        this.validarPrecios(datos.precioMayorista, datos.precioCliente, datos.precioOcasional);
        if (datos.alicuotaIva !== undefined) {
            this.validarAlicuotaIva(datos.alicuotaIva);
        }
    }
    validarDenominacion(denominacion) {
        if (!denominacion || denominacion.trim().length === 0) {
            throw new common_1.BadRequestException('La denominación es obligatoria');
        }
        if (denominacion.length > 200) {
            throw new common_1.BadRequestException('La denominación no puede superar 200 caracteres');
        }
    }
    validarIds(marcaId, lineaId) {
        if (!marcaId || marcaId <= 0) {
            throw new common_1.BadRequestException('Marca ID es requerido y debe ser válido');
        }
        if (!lineaId || lineaId <= 0) {
            throw new common_1.BadRequestException('Línea ID es requerido y debe ser válido');
        }
    }
    validarPrecios(precioMayorista, precioCliente, precioOcasional) {
        if (precioMayorista !== undefined && precioMayorista < 0) {
            throw new common_1.BadRequestException('El precio mayorista no puede ser negativo');
        }
        if (precioCliente !== undefined && precioCliente < 0) {
            throw new common_1.BadRequestException('El precio cliente no puede ser negativo');
        }
        if (precioOcasional !== undefined && precioOcasional < 0) {
            throw new common_1.BadRequestException('El precio ocasional no puede ser negativo');
        }
        if (precioMayorista && precioCliente) {
            if (precioMayorista > precioCliente) {
                throw new common_1.BadRequestException('El precio Mayorista no puede superar el precio Cliente');
            }
        }
        if (precioCliente && precioOcasional) {
            if (precioCliente > precioOcasional) {
                throw new common_1.BadRequestException('El precio Cliente no puede superar el precio Ocasional');
            }
        }
        if (precioMayorista && precioOcasional) {
            if (precioMayorista > precioOcasional) {
                throw new common_1.BadRequestException('El precio Mayorista no puede superar el precio Ocasional');
            }
        }
    }
    validarAlicuotaIva(alicuotaIva) {
        if (alicuotaIva < 0 || alicuotaIva > 100) {
            throw new common_1.BadRequestException('La alícuota IVA debe estar entre 0 y 100');
        }
    }
};
exports.ProductoIntrinsicValidationService = ProductoIntrinsicValidationService;
exports.ProductoIntrinsicValidationService = ProductoIntrinsicValidationService = __decorate([
    (0, common_1.Injectable)()
], ProductoIntrinsicValidationService);
//# sourceMappingURL=producto-intrinsic-validation.service.ts.js.map
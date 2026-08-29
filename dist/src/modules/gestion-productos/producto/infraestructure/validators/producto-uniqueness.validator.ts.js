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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ProductoUniquenessValidator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoUniquenessValidator = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
let ProductoUniquenessValidator = ProductoUniquenessValidator_1 = class ProductoUniquenessValidator {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(ProductoUniquenessValidator_1.name);
    }
    async validarDenominacionUnica(denominacion, excludeId) {
        const existingProduct = await this.repository.existsByDenominacion(denominacion, excludeId);
        if (existingProduct) {
            this.logger.warn(`Producto - Denominación duplicada: "${denominacion}"`);
            throw new common_1.ConflictException(`La denominación "${denominacion}" ya está en uso`);
        }
    }
    async validarCodigoProveedorUnico(codigoProveedor, excludeId) {
        const existingProduct = await this.repository.existsByCodigoProveedor(codigoProveedor, excludeId);
        if (existingProduct) {
            this.logger.warn(`Producto - codigo duplicado: "${codigoProveedor}"`);
            throw new common_1.ConflictException(`El codigo  "${codigoProveedor}" ya está en uso`);
        }
    }
};
exports.ProductoUniquenessValidator = ProductoUniquenessValidator;
exports.ProductoUniquenessValidator = ProductoUniquenessValidator = ProductoUniquenessValidator_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)('IProductoRepository')),
    __metadata("design:paramtypes", [Object])
], ProductoUniquenessValidator);
//# sourceMappingURL=producto-uniqueness.validator.ts.js.map
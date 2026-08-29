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
exports.UpdatePrecioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdatePrecioDto {
}
exports.UpdatePrecioDto = UpdatePrecioDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100.5, description: 'Costo en moneda local' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'skip debe ser un número entero positivo o 0' }),
    __metadata("design:type", Number)
], UpdatePrecioDto.prototype, "costo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50.25, description: 'Costo en dólares' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'skip debe ser un número entero positivo o 0' }),
    __metadata("design:type", Number)
], UpdatePrecioDto.prototype, "costoDolar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50.25, description: 'Costo en dólares' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'skip debe ser un número entero positivo o 0' }),
    __metadata("design:type", Number)
], UpdatePrecioDto.prototype, "cotizacionDolar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Porcentaje de aumento' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Porcentaje de aumento ' }),
    __metadata("design:type", Number)
], UpdatePrecioDto.prototype, "porcentaje", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'ID del usuario que realiza la actualización' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdatePrecioDto.prototype, "usuarioId", void 0);
//# sourceMappingURL=update-precio.dto.js.map
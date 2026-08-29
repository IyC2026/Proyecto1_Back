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
exports.CondicionIvaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CondicionIvaDto {
}
exports.CondicionIvaDto = CondicionIvaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123, description: 'ID de la condición de IVA' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CondicionIvaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Consumidor Final',
        description: 'Denominación de la condición de IVA',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CondicionIvaDto.prototype, "denominacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A',
        description: 'Letra asociada a la condición de IVA',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CondicionIvaDto.prototype, "letra", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Consumidor Final',
        description: 'Denominación de la condición de IVA',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CondicionIvaDto.prototype, "observacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si f CUIT ess requerido',
        type: Boolean
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CondicionIvaDto.prototype, "requiereCuit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si documento es requerido',
        type: Boolean,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CondicionIvaDto.prototype, "requiereDocumento", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CondicionIvaDto.prototype, "sistema", void 0);
//# sourceMappingURL=condicion-iva.dto.js.map
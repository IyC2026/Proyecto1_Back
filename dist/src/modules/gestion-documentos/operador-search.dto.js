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
exports.OperadorSearchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const referencia_dto_1 = require("../common/dto/referencia.dto");
class OperadorSearchDto {
}
exports.OperadorSearchDto = OperadorSearchDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 123,
        description: 'ID de del cliente o proveedor',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], OperadorSearchDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Razon social del cliente yo proveedor',
    }),
    __metadata("design:type", String)
], OperadorSearchDto.prototype, "denominacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Razon social del cliente yo proveedor',
    }),
    __metadata("design:type", String)
], OperadorSearchDto.prototype, "denominacionAfip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Razon social del cliente yo proveedor',
    }),
    __metadata("design:type", String)
], OperadorSearchDto.prototype, "observacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OperadorSearchDto.prototype, "letra", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OperadorSearchDto.prototype, "cuit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OperadorSearchDto.prototype, "dni", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OperadorSearchDto.prototype, "domicilioString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OperadorSearchDto.prototype, "condicionIva", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OperadorSearchDto.prototype, "saldo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OperadorSearchDto.prototype, "sistema", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => referencia_dto_1.ReferenciaDto,
        description: 'Vendedor asociada al cliente',
        required: true,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => referencia_dto_1.ReferenciaDto),
    __metadata("design:type", referencia_dto_1.ReferenciaDto)
], OperadorSearchDto.prototype, "vendedor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si es proveevor materia prima',
        type: Boolean,
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OperadorSearchDto.prototype, "esProveedorMateriaPrima", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OperadorSearchDto.prototype, "esProveedorGastos", void 0);
//# sourceMappingURL=operador-search.dto.js.map
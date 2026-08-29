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
exports.OperadorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const domicilio_dto_1 = require("../gutil/domicilio/dto/domicilio.dto");
const referencia_dto_1 = require("../common/dto/referencia.dto");
const condicion_iva_dto_1 = require("../gutil/condicion-iva/dto/condicion-iva.dto");
class OperadorDto {
}
exports.OperadorDto = OperadorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 123,
        description: 'ID de del cliente o proveedor',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], OperadorDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Razon social del cliente yo proveedor',
    }),
    __metadata("design:type", String)
], OperadorDto.prototype, "denominacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Razon social del cliente yo proveedor',
    }),
    __metadata("design:type", String)
], OperadorDto.prototype, "codigo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Razon social del cliente yo proveedor',
    }),
    __metadata("design:type", String)
], OperadorDto.prototype, "denominacionAfip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Razon social del cliente yo proveedor',
    }),
    __metadata("design:type", String)
], OperadorDto.prototype, "observacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OperadorDto.prototype, "letra", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OperadorDto.prototype, "cuit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OperadorDto.prototype, "dni", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OperadorDto.prototype, "mail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => referencia_dto_1.ReferenciaDto,
        description: 'Categoria iva',
        required: true,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => condicion_iva_dto_1.CondicionIvaDto),
    __metadata("design:type", condicion_iva_dto_1.CondicionIvaDto)
], OperadorDto.prototype, "condicionIva", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: () => referencia_dto_1.ReferenciaDto,
        description: 'vendedor',
        required: true,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => referencia_dto_1.ReferenciaDto),
    __metadata("design:type", referencia_dto_1.ReferenciaDto)
], OperadorDto.prototype, "vendedor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => domicilio_dto_1.DomicilioDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => domicilio_dto_1.DomicilioDto),
    __metadata("design:type", domicilio_dto_1.DomicilioDto)
], OperadorDto.prototype, "domicilio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OperadorDto.prototype, "domicilioString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OperadorDto.prototype, "saldo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OperadorDto.prototype, "sistema", void 0);
//# sourceMappingURL=operador.dto.js.map
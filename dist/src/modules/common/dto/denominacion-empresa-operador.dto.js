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
exports.DenominacionEmpresaOperadorDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class DenominacionEmpresaOperadorDto {
    constructor() {
        this.empresaId = 0;
        this.condicionIvaId = 0;
        this.skip = 0;
        this.take = 10;
    }
}
exports.DenominacionEmpresaOperadorDto = DenominacionEmpresaOperadorDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DenominacionEmpresaOperadorDto.prototype, "denominacion", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'empresaId debe ser un número entero mayor que 0' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DenominacionEmpresaOperadorDto.prototype, "empresaId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DenominacionEmpresaOperadorDto.prototype, "condicionIvaId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0, { message: 'skip debe ser un número entero positivo o 0' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DenominacionEmpresaOperadorDto.prototype, "skip", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'take debe ser un número entero mayor que 0' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DenominacionEmpresaOperadorDto.prototype, "take", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], DenominacionEmpresaOperadorDto.prototype, "poseeSaldo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], DenominacionEmpresaOperadorDto.prototype, "incluirEliminados", void 0);
//# sourceMappingURL=denominacion-empresa-operador.dto.js.map
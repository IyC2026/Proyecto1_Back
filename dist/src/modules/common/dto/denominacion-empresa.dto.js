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
exports.DenominacionEmpresaDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class DenominacionEmpresaDto {
    constructor() {
        this.empresaId = 0;
        this.skip = 0;
        this.take = 10;
    }
}
exports.DenominacionEmpresaDto = DenominacionEmpresaDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DenominacionEmpresaDto.prototype, "denominacion", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DenominacionEmpresaDto.prototype, "empresaId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0, { message: 'skip debe ser un número entero positivo o 0' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DenominacionEmpresaDto.prototype, "skip", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'take debe ser un número entero mayor que 0' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DenominacionEmpresaDto.prototype, "take", void 0);
//# sourceMappingURL=denominacion-empresa.dto.js.map
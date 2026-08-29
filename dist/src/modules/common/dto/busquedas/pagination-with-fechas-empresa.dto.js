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
exports.PaginationWithFechasEmpresaDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const pagination_empresa_fechas_dto_1 = require("./pagination-empresa-fechas.dto");
class PaginationWithFechasEmpresaDto extends pagination_empresa_fechas_dto_1.PaginationEmpresaFechasDto {
    constructor() {
        super(...arguments);
        this.operadorId = 0;
        this.orden = 0;
        this.estado = 0;
    }
}
exports.PaginationWithFechasEmpresaDto = PaginationWithFechasEmpresaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la empresa. Si no se envía, toma el valor 0.',
        example: 1,
        required: false,
        default: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationWithFechasEmpresaDto.prototype, "operadorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la empresa. Si no se envía, toma el valor 0.',
        example: 1,
        required: true,
        default: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationWithFechasEmpresaDto.prototype, "orden", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la empresa. Si no se envía, toma el valor 0.',
        example: 1,
        required: true,
        default: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationWithFechasEmpresaDto.prototype, "estado", void 0);
//# sourceMappingURL=pagination-with-fechas-empresa.dto.js.map
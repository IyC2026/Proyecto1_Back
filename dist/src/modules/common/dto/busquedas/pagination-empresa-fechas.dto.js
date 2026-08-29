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
exports.PaginationEmpresaFechasDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PaginationEmpresaFechasDto {
    constructor() {
        this.empresaId = 0;
        this.skip = 0;
        this.take = 10;
    }
}
exports.PaginationEmpresaFechasDto = PaginationEmpresaFechasDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01', type: String, format: 'date' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], PaginationEmpresaFechasDto.prototype, "fechaDesde", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-31', type: String, format: 'date' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_transformer_1.Transform)(({ value }) => {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            date.setUTCHours(23, 59, 59, 999);
        }
        return date;
    }),
    __metadata("design:type", Date)
], PaginationEmpresaFechasDto.prototype, "fechaHasta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 0 }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationEmpresaFechasDto.prototype, "empresaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 0 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationEmpresaFechasDto.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 10 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationEmpresaFechasDto.prototype, "take", void 0);
//# sourceMappingURL=pagination-empresa-fechas.dto.js.map
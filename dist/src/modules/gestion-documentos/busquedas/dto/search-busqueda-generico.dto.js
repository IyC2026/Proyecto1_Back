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
exports.SearchBusquedaGenericoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SearchBusquedaGenericoDto {
    constructor() {
        this.empresaId = 0;
        this.skip = 0;
        this.take = 10;
        this.operadorId = 0;
    }
}
exports.SearchBusquedaGenericoDto = SearchBusquedaGenericoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha inicial del filtro (incluida)',
        example: '2024-01-01',
        type: String,
        format: 'date',
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], SearchBusquedaGenericoDto.prototype, "fechaDesde", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha final del filtro (incluida)',
        example: '2024-12-31',
        type: String,
        format: 'date',
    }),
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
], SearchBusquedaGenericoDto.prototype, "fechaHasta", void 0);
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
], SearchBusquedaGenericoDto.prototype, "empresaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad de elementos a omitir (paginación)',
        example: 0,
        minimum: 0,
        default: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0, { message: 'skip debe ser un número entero positivo o 0' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SearchBusquedaGenericoDto.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad de elementos a retornar (paginación)',
        example: 10,
        minimum: 1,
        default: 10,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'take debe ser un número entero mayor que 0' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SearchBusquedaGenericoDto.prototype, "take", void 0);
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
], SearchBusquedaGenericoDto.prototype, "operadorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'tipo documento .',
        example: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SearchBusquedaGenericoDto.prototype, "tipoDocumento", void 0);
//# sourceMappingURL=search-busqueda-generico.dto.js.map
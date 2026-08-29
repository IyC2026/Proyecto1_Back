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
exports.ProductoDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const alicuota_iva_enum_1 = require("../../../organizacion/enums/alicuota-iva.enum");
const swagger_1 = require("@nestjs/swagger");
const referencia_dto_1 = require("../../../common/dto/referencia.dto");
class ProductoDto {
}
exports.ProductoDto = ProductoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ProductoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Caja de tornillos',
        description: 'Denominación o nombre del producto. Esta formado por la linea y la marca',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductoDto.prototype, "denominacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductoDto.prototype, "observacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductoDto.prototype, "codigoProveedor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductoDto.prototype, "codigoBarra", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ProductoDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductoDto.prototype, "costo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductoDto.prototype, "precio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductoDto.prototype, "porcentaje", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ProductoDto.prototype, "costoEnDolar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductoDto.prototype, "costoDolar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductoDto.prototype, "cotizacionDolar", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductoDto.prototype, "precioDolar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ProductoDto.prototype, "destacado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ProductoDto.prototype, "envioGratis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => referencia_dto_1.ReferenciaDto,
        description: 'Linea asociada al producto',
        required: true,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => referencia_dto_1.ReferenciaDto),
    __metadata("design:type", referencia_dto_1.ReferenciaDto)
], ProductoDto.prototype, "linea", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => referencia_dto_1.ReferenciaDto,
        description: 'Marca asociada al producto',
        required: true,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => referencia_dto_1.ReferenciaDto),
    __metadata("design:type", referencia_dto_1.ReferenciaDto)
], ProductoDto.prototype, "marca", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => referencia_dto_1.ReferenciaDto,
        description: 'proveedor asociada al producto',
        required: true,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => referencia_dto_1.ReferenciaDto),
    __metadata("design:type", referencia_dto_1.ReferenciaDto)
], ProductoDto.prototype, "proveedor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: alicuota_iva_enum_1.AlicuotaIva,
        enumName: 'AlicuotaIva',
    }),
    (0, class_validator_1.IsEnum)(alicuota_iva_enum_1.AlicuotaIva),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string'
        ? alicuota_iva_enum_1.AlicuotaIva[value.toUpperCase()]
        : value),
    __metadata("design:type", Number)
], ProductoDto.prototype, "alicuotaIva", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductoDto.prototype, "ubicacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], ProductoDto.prototype, "utilizaStockMinimo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ProductoDto.prototype, "stockMinimo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], ProductoDto.prototype, "utilizaPack", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ProductoDto.prototype, "cantidadPorPack", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ProductoDto.prototype, "sistema", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductoDto.prototype, "codigoReferencia", void 0);
//# sourceMappingURL=producto.dto.js.map
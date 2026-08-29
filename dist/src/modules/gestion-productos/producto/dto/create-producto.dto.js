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
exports.CreateProductoDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const alicuota_iva_enum_1 = require("../../../organizacion/enums/alicuota-iva.enum");
class CreateProductoDto {
}
exports.CreateProductoDto = CreateProductoDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim().toLowerCase()),
    (0, class_validator_1.IsString)({ message: 'La denominación debe ser una cadena de texto.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La denominación no puede estar vacía.' }),
    (0, class_validator_1.MaxLength)(255, { message: 'La denominación no puede estar vacía.' }),
    (0, class_validator_1.Matches)(/^[\w áéíóúÁÉÍÓÚñÑ.\-/%]+$/, {
        message: 'La denominación contiene caracteres inválidos ',
    }),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "denominacion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "observacion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "codigoProveedor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "codigoBarra", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "codigoReferencia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "ubicacion", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductoDto.prototype, "utilizaStockMinimo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "stockMinimo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], CreateProductoDto.prototype, "costoEnDolar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], CreateProductoDto.prototype, "destacado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], CreateProductoDto.prototype, "envioGratis", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "costo", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductoDto.prototype, "utilizaPack", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "cantidadPorPack", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "costoDolar", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La linea es obligatoria.' }),
    (0, class_validator_1.IsInt)({ message: 'La linea  debe ser un número entero.' }),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "lineaId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La marca es obligatoria.' }),
    (0, class_validator_1.IsInt)({ message: 'La marca  debe ser un número entero.' }),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "marcaId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "porcentaje", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "precio", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(alicuota_iva_enum_1.AlicuotaIva, {
        message: 'tipo debe ser ALICUOTA_0  ALICUOTA_105, ALICUOTA_21, ALICUOTA_27,',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return alicuota_iva_enum_1.AlicuotaIva[value.toUpperCase()];
        }
        return value;
    }),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "alicuotaIva", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El usuarioCreatedId es obligatorio.' }),
    (0, class_validator_1.IsInt)({ message: 'El usuarioCreatedId debe ser un número entero.' }),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "usuarioCreatedId", void 0);
//# sourceMappingURL=create-producto.dto.js.map
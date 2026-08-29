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
exports.CreateProveedorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_domicilio_dto_1 = require("../../../gutil/domicilio/dto/create-domicilio.dto");
class CreateProveedorDto {
}
exports.CreateProveedorDto = CreateProveedorDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    (0, swagger_1.ApiProperty)({
        example: '134',
        description: 'por el momento va a tomar el id',
    }),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "codigoProveedor", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim().toLowerCase()),
    (0, class_validator_1.IsString)({ message: 'La denominación debe ser una cadena de texto.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La denominación no puede estar vacía.' }),
    (0, class_validator_1.MaxLength)(255, { message: 'La denominación no puede estar vacía.' }),
    (0, class_validator_1.Matches)(/^[\w áéíóúÁÉÍÓÚñÑ.\-/%]+$/, {
        message: 'La denominación contiene caracteres inválidos ',
    }),
    (0, swagger_1.ApiProperty)({
        example: 'Proveedor S.A.',
        description: 'Nombre del proveedor',
    }),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "denominacion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    (0, swagger_1.ApiProperty)({
        example: 'Proveedor S.A.',
        description: 'Nombre legal del proveedor',
    }),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "denominacionAfip", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    (0, swagger_1.ApiProperty)({
        example: 'CUIT',
        description: 'Tipo de identificación fiscal',
    }),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "cuit", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La Categoria IVA es obligatoria.' }),
    (0, class_validator_1.IsInt)({ message: 'La Categoria IVA  debe ser un número entero.' }),
    __metadata("design:type", Number)
], CreateProveedorDto.prototype, "condicionIvaId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El domicilio es obligatorio.' }),
    (0, class_transformer_1.Type)(() => create_domicilio_dto_1.CreateDomicilioDto),
    __metadata("design:type", create_domicilio_dto_1.CreateDomicilioDto)
], CreateProveedorDto.prototype, "domicilio", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo proveedor materia prima es obligatorio.' }),
    (0, class_validator_1.IsBoolean)({ message: 'El campo proveedor materia prima debe ser booleano.' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], CreateProveedorDto.prototype, "esProveedorMateriaPrima", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo proveedor de gastos es obligatorio.' }),
    (0, class_validator_1.IsBoolean)({ message: 'El campo proveedor gastos debe ser booleano.' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], CreateProveedorDto.prototype, "esProveedorGastos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "mail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "observacion", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El usuarioCreatedId es obligatorio.' }),
    (0, class_validator_1.IsInt)({ message: 'El usuarioCreatedId debe ser un número entero.' }),
    __metadata("design:type", Number)
], CreateProveedorDto.prototype, "usuarioCreatedId", void 0);
//# sourceMappingURL=create-proveedor.dto.js.map
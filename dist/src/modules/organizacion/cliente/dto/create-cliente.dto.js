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
exports.CreateClienteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_domicilio_dto_1 = require("../../../gutil/domicilio/dto/create-domicilio.dto");
class CreateClienteDto {
}
exports.CreateClienteDto = CreateClienteDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim().toLowerCase()),
    (0, class_validator_1.IsString)({ message: 'La denominación debe ser una cadena de texto.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La denominación no puede estar vacía.' }),
    (0, class_validator_1.MaxLength)(255, { message: 'La denominación no puede estar vacía.' }),
    (0, class_validator_1.Matches)(/^[\w áéíóúÁÉÍÓÚñÑ.\-/%]+$/, {
        message: 'La denominación contiene caracteres inválidos ',
    }),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "denominacion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "denominacionAfip", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    (0, swagger_1.ApiProperty)({
        example: '134',
        description: 'por el momento va a tomar el id',
    }),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "codigo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "cuit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La Condicion IVA es obligatoria.' }),
    (0, class_validator_1.IsInt)({ message: 'La Condicion IVA  debe ser un número entero.' }),
    __metadata("design:type", Number)
], CreateClienteDto.prototype, "condicionIvaId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El personal es obligatorio.' }),
    (0, class_validator_1.IsInt)({ message: 'El personal es obligatorio.' }),
    __metadata("design:type", Number)
], CreateClienteDto.prototype, "vendedorId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El domicilio es obligatorio.' }),
    (0, class_transformer_1.Type)(() => create_domicilio_dto_1.CreateDomicilioDto),
    __metadata("design:type", create_domicilio_dto_1.CreateDomicilioDto)
], CreateClienteDto.prototype, "domicilio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "mail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "celular", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateClienteDto.prototype, "contactoNombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateClienteDto.prototype, "contactoCargo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "observacion", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El usuarioCreatedId es obligatorio.' }),
    (0, class_validator_1.IsInt)({ message: 'El usuarioCreatedId debe ser un número entero.' }),
    __metadata("design:type", Number)
], CreateClienteDto.prototype, "usuarioCreatedId", void 0);
//# sourceMappingURL=create-cliente.dto.js.map
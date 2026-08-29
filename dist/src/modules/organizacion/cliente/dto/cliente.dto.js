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
exports.ClienteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const referencia_dto_1 = require("../../../common/dto/referencia.dto");
const create_domicilio_dto_1 = require("../../../gutil/domicilio/dto/create-domicilio.dto");
class ClienteDto {
}
exports.ClienteDto = ClienteDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim().toLowerCase()),
    (0, class_validator_1.IsString)({ message: 'La denominación debe ser una cadena de texto.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La denominación no puede estar vacía.' }),
    (0, class_validator_1.MaxLength)(255, { message: 'La denominación no puede estar vacía.' }),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ]+$/, {
        message: 'La denominación solo puede contener letras, números y espacios.',
    }),
    __metadata("design:type", String)
], ClienteDto.prototype, "denominacion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], ClienteDto.prototype, "denominacionAfip", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], ClienteDto.prototype, "cuit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], ClienteDto.prototype, "dni", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => referencia_dto_1.ReferenciaDto,
        description: 'Condicion IVA',
        required: true,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => referencia_dto_1.ReferenciaDto),
    __metadata("design:type", referencia_dto_1.ReferenciaDto)
], ClienteDto.prototype, "condicionIva", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => referencia_dto_1.ReferenciaDto,
        description: 'Zona',
        required: true,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => referencia_dto_1.ReferenciaDto),
    __metadata("design:type", referencia_dto_1.ReferenciaDto)
], ClienteDto.prototype, "personal", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El domicilio es obligatorio.' }),
    (0, class_transformer_1.Type)(() => create_domicilio_dto_1.CreateDomicilioDto),
    __metadata("design:type", create_domicilio_dto_1.CreateDomicilioDto)
], ClienteDto.prototype, "domicilio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClienteDto.prototype, "domicilioString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ClienteDto.prototype, "requiereCuit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClienteDto.prototype, "celular", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], ClienteDto.prototype, "contactoNombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], ClienteDto.prototype, "contactoCargo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ClienteDto.prototype, "requiereDocumento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClienteDto.prototype, "observacion", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El usuarioCreatedId es obligatorio.' }),
    (0, class_validator_1.IsInt)({ message: 'El usuarioCreatedId debe ser un número entero.' }),
    __metadata("design:type", Number)
], ClienteDto.prototype, "usuarioCreatedId", void 0);
//# sourceMappingURL=cliente.dto.js.map
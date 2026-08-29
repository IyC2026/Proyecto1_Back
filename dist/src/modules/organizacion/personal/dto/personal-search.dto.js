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
exports.PersonalSearchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PersonalSearchDto {
}
exports.PersonalSearchDto = PersonalSearchDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 123,
        description: 'ID de del cliente o proveedor',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PersonalSearchDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim().toLowerCase()),
    (0, class_validator_1.IsString)({ message: 'La denominación debe ser una cadena de texto.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La denominación no puede estar vacía.' }),
    (0, class_validator_1.MaxLength)(255, { message: 'La denominación no puede estar vacía.' }),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ]+$/, {
        message: 'La denominación solo puede contener letras, números y espacios.',
    }),
    __metadata("design:type", String)
], PersonalSearchDto.prototype, "denominacion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PersonalSearchDto.prototype, "domicilioString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PersonalSearchDto.prototype, "sistema", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, description: 'Fecha de eliminación (null si está activa)', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], PersonalSearchDto.prototype, "deletedAt", void 0);
//# sourceMappingURL=personal-search.dto.js.map
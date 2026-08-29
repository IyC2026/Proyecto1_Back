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
exports.UpdateProductoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_producto_dto_1 = require("./create-producto.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateProductoDto extends (0, mapped_types_1.PartialType)(create_producto_dto_1.CreateProductoDto) {
}
exports.UpdateProductoDto = UpdateProductoDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim().toLowerCase()),
    (0, class_validator_1.IsString)({ message: 'La denominación debe ser una cadena de texto.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La denominación no puede estar vacía.' }),
    (0, class_validator_1.MaxLength)(255, { message: 'La denominación no puede estar vacía.' }),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ.\-/]+$/, {
        message: 'La denominación solo puede contener letras, números, espacios, puntos, guiones y barras.',
    }),
    __metadata("design:type", String)
], UpdateProductoDto.prototype, "denominacion", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El usuarioUpdatedId es obligatorio.' }),
    (0, class_validator_1.IsInt)({ message: 'El usuarioUpdatedId debe ser un número entero.' }),
    __metadata("design:type", Number)
], UpdateProductoDto.prototype, "usuarioUpdatedId", void 0);
//# sourceMappingURL=update-producto.dto.js.map
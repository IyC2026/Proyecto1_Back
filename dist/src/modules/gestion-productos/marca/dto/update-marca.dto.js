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
exports.UpdateMarcaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_marca_dto_1 = require("./create-marca.dto");
const class_validator_1 = require("class-validator");
class UpdateMarcaDto extends (0, mapped_types_1.PartialType)(create_marca_dto_1.CreateMarcaDto) {
}
exports.UpdateMarcaDto = UpdateMarcaDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El usuarioUpdatedId es obligatorio.' }),
    (0, class_validator_1.IsInt)({ message: 'El usuarioUpdatedId debe ser un número entero.' }),
    __metadata("design:type", Number)
], UpdateMarcaDto.prototype, "usuarioUpdatedId", void 0);
//# sourceMappingURL=update-marca.dto.js.map
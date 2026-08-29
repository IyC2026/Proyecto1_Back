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
exports.DeletedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DeletedDto {
}
exports.DeletedDto = DeletedDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El id de la entidad a eliminar es obligatorio.' }),
    (0, swagger_1.ApiProperty)({ description: 'id de la entidad a eliminar' }),
    __metadata("design:type", Number)
], DeletedDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El usuarioCreatedId es obligatorio.' }),
    (0, class_validator_1.IsInt)({ message: 'El usuarioCreatedId debe ser un número entero.' }),
    (0, swagger_1.ApiProperty)({ description: 'id del usuario que elimina' }),
    __metadata("design:type", Number)
], DeletedDto.prototype, "usuarioId", void 0);
//# sourceMappingURL=deleted.dto.js.map
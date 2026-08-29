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
exports.UpdateLineaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_linea_dto_1 = require("./create-linea.dto");
const class_validator_1 = require("class-validator");
class UpdateLineaDto extends (0, mapped_types_1.PartialType)(create_linea_dto_1.CreateLineaDto) {
}
exports.UpdateLineaDto = UpdateLineaDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateLineaDto.prototype, "utilizaStockMinimo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El usuarioCreatedId es obligatorio.' }),
    (0, class_validator_1.IsInt)({ message: 'El usuarioCreatedId debe ser un número entero.' }),
    __metadata("design:type", Number)
], UpdateLineaDto.prototype, "usuarioUpdatedId", void 0);
//# sourceMappingURL=update-linea.dto.js.map
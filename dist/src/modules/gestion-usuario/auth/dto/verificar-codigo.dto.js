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
exports.VerificarCodigoDto = void 0;
const class_validator_1 = require("class-validator");
class VerificarCodigoDto {
}
exports.VerificarCodigoDto = VerificarCodigoDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un correo electrónico válido' }),
    __metadata("design:type", String)
], VerificarCodigoDto.prototype, "mail", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El código debe ser una cadena' }),
    (0, class_validator_1.Length)(6, 6, { message: 'El código debe tener exactamente 6 caracteres' }),
    __metadata("design:type", String)
], VerificarCodigoDto.prototype, "codigo", void 0);
//# sourceMappingURL=verificar-codigo.dto.js.map
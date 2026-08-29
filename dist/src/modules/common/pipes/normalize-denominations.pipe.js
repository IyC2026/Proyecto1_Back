"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalizeDenominacionPipe = void 0;
const common_1 = require("@nestjs/common");
let NormalizeDenominacionPipe = class NormalizeDenominacionPipe {
    transform(value, metadata) {
        if (value?.denominacion && typeof value.denominacion !== 'string') {
            throw new common_1.BadRequestException('La denominación debe ser una cadena.');
        }
        if (value?.denominacion) {
            const normalizedValue = value.denominacion.trim().toUpperCase();
            if (normalizedValue.length === 0) {
                throw new common_1.BadRequestException('La denominación no puede estar vacía.');
            }
            value.denominacion = normalizedValue;
        }
        return value;
    }
};
exports.NormalizeDenominacionPipe = NormalizeDenominacionPipe;
exports.NormalizeDenominacionPipe = NormalizeDenominacionPipe = __decorate([
    (0, common_1.Injectable)()
], NormalizeDenominacionPipe);
//# sourceMappingURL=normalize-denominations.pipe.js.map
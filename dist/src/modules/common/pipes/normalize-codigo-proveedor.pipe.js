"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalizeCodigoProveedorPipe = void 0;
const common_1 = require("@nestjs/common");
let NormalizeCodigoProveedorPipe = class NormalizeCodigoProveedorPipe {
    transform(value, metadata) {
        const codigo = value?.codigoProveedor;
        if (codigo !== undefined && typeof codigo !== 'string') {
            throw new common_1.BadRequestException('El código del proveedor debe ser una cadena.');
        }
        if (typeof codigo === 'string' && codigo.trim() !== '') {
            value.codigoProveedor = codigo.trim().toLowerCase();
        }
        return value;
    }
};
exports.NormalizeCodigoProveedorPipe = NormalizeCodigoProveedorPipe;
exports.NormalizeCodigoProveedorPipe = NormalizeCodigoProveedorPipe = __decorate([
    (0, common_1.Injectable)()
], NormalizeCodigoProveedorPipe);
//# sourceMappingURL=normalize-codigo-proveedor.pipe.js.map
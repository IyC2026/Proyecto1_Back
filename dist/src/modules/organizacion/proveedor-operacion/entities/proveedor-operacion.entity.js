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
exports.ProveedorOperacion = void 0;
const typeorm_1 = require("typeorm");
const proveedor_entity_1 = require("../../proveedor/domain/entities/proveedor.entity");
let ProveedorOperacion = class ProveedorOperacion {
};
exports.ProveedorOperacion = ProveedorOperacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProveedorOperacion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proveedor_entity_1.Proveedor, (pro) => pro.proveedoresOperacion, {
        eager: true,
    }),
    __metadata("design:type", proveedor_entity_1.Proveedor)
], ProveedorOperacion.prototype, "proveedor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProveedorOperacion.prototype, "operacionId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProveedorOperacion.prototype, "tipoOperacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProveedorOperacion.prototype, "creadoEn", void 0);
exports.ProveedorOperacion = ProveedorOperacion = __decorate([
    (0, typeorm_1.Entity)('proveedor_operacion')
], ProveedorOperacion);
//# sourceMappingURL=proveedor-operacion.entity.js.map
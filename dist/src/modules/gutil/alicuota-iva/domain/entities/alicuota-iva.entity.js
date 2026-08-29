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
exports.AlicuotaIva = void 0;
const factor_column_decorator_1 = require("../../../../common/decorators/factor-column.decorator");
const typeorm_1 = require("typeorm");
let AlicuotaIva = class AlicuotaIva {
};
exports.AlicuotaIva = AlicuotaIva;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AlicuotaIva.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AlicuotaIva.prototype, "denominacion", void 0);
__decorate([
    (0, factor_column_decorator_1.FactorColumn)(),
    __metadata("design:type", Number)
], AlicuotaIva.prototype, "alicuota", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        unique: true,
    }),
    __metadata("design:type", Number)
], AlicuotaIva.prototype, "codigoAfip", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AlicuotaIva.prototype, "observacion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AlicuotaIva.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AlicuotaIva.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], AlicuotaIva.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], AlicuotaIva.prototype, "usuarioCreatedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], AlicuotaIva.prototype, "usuarioDeletedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], AlicuotaIva.prototype, "usuarioUpdatedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], AlicuotaIva.prototype, "sistema", void 0);
exports.AlicuotaIva = AlicuotaIva = __decorate([
    (0, typeorm_1.Entity)('alicuota_iva')
], AlicuotaIva);
//# sourceMappingURL=alicuota-iva.entity.js.map
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
exports.ClienteOperacion = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("../../cliente/domain/entities/cliente.entity");
let ClienteOperacion = class ClienteOperacion {
};
exports.ClienteOperacion = ClienteOperacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ClienteOperacion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, (cli) => cli.clientesOperacion, { eager: true }),
    __metadata("design:type", cliente_entity_1.Cliente)
], ClienteOperacion.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ClienteOperacion.prototype, "operacionId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClienteOperacion.prototype, "tipoOperacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ClienteOperacion.prototype, "creadoEn", void 0);
exports.ClienteOperacion = ClienteOperacion = __decorate([
    (0, typeorm_1.Entity)('cliente_operacion')
], ClienteOperacion);
//# sourceMappingURL=cliente-operacion.entity.js.map
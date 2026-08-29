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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteOperacionController = void 0;
const common_1 = require("@nestjs/common");
const cliente_operacion_service_1 = require("./cliente-operacion.service");
const create_cliente_operacion_dto_1 = require("./dto/create-cliente-operacion.dto");
const update_cliente_operacion_dto_1 = require("./dto/update-cliente-operacion.dto");
const swagger_1 = require("@nestjs/swagger");
let ClienteOperacionController = class ClienteOperacionController {
    constructor(clienteOperacionService) {
        this.clienteOperacionService = clienteOperacionService;
    }
    create(createClienteOperacionDto) {
        return this.clienteOperacionService.create(createClienteOperacionDto);
    }
    findAll() {
        return this.clienteOperacionService.findAll();
    }
    findOne(id) {
        return this.clienteOperacionService.findOne(+id);
    }
    update(id, updateClienteOperacionDto) {
        return this.clienteOperacionService.update(+id, updateClienteOperacionDto);
    }
    remove(id) {
        return this.clienteOperacionService.remove(+id);
    }
};
exports.ClienteOperacionController = ClienteOperacionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_operacion_dto_1.CreateClienteOperacionDto]),
    __metadata("design:returntype", void 0)
], ClienteOperacionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClienteOperacionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClienteOperacionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cliente_operacion_dto_1.UpdateClienteOperacionDto]),
    __metadata("design:returntype", void 0)
], ClienteOperacionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClienteOperacionController.prototype, "remove", null);
exports.ClienteOperacionController = ClienteOperacionController = __decorate([
    (0, swagger_1.ApiTags)('Organizacion'),
    (0, common_1.Controller)('cliente-operacion'),
    __metadata("design:paramtypes", [cliente_operacion_service_1.ClienteOperacionService])
], ClienteOperacionController);
//# sourceMappingURL=cliente-operacion.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteOperacionService = void 0;
const common_1 = require("@nestjs/common");
let ClienteOperacionService = class ClienteOperacionService {
    create(createClienteOperacionDto) {
        return 'This action adds a new clienteOperacion';
    }
    findAll() {
        return `This action returns all clienteOperacion`;
    }
    findOne(id) {
        return `This action returns a #${id} clienteOperacion`;
    }
    update(id, updateClienteOperacionDto) {
        return `This action updates a #${id} clienteOperacion`;
    }
    remove(id) {
        return `This action removes a #${id} clienteOperacion`;
    }
};
exports.ClienteOperacionService = ClienteOperacionService;
exports.ClienteOperacionService = ClienteOperacionService = __decorate([
    (0, common_1.Injectable)()
], ClienteOperacionService);
//# sourceMappingURL=cliente-operacion.service.js.map
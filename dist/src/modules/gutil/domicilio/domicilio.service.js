"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DomicilioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomicilioService = void 0;
const common_1 = require("@nestjs/common");
const domicilio_entity_1 = require("./entities/domicilio.entity");
let DomicilioService = DomicilioService_1 = class DomicilioService {
    constructor() {
        this.logger = new common_1.Logger(DomicilioService_1.name);
    }
    async create(uow, ciudad, direccion, usuarioCreatedId) {
        const repo = uow.getRepository(domicilio_entity_1.Domicilio);
        const domicilio = repo.create({
            direccion: direccion,
            localidad: ciudad,
            usuarioCreatedId: usuarioCreatedId
        });
        const domicilioGuardado = await repo.save(domicilio);
        return domicilioGuardado;
    }
    findAll() {
        return `This action returns all domicilio`;
    }
    findOne(id) {
        return `This action returns a #${id} domicilio`;
    }
    update(id, updateDomicilioDto) {
        return `This action updates a #${id} domicilio`;
    }
    remove(id) {
        return `This action removes a #${id} domicilio`;
    }
};
exports.DomicilioService = DomicilioService;
exports.DomicilioService = DomicilioService = DomicilioService_1 = __decorate([
    (0, common_1.Injectable)()
], DomicilioService);
//# sourceMappingURL=domicilio.service.js.map
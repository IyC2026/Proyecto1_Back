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
var RolService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolService = void 0;
const common_1 = require("@nestjs/common");
let RolService = RolService_1 = class RolService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(RolService_1.name);
        this.ENTITY_NAME = 'Rol';
    }
    async create(dto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${dto.denominacion} a: ${dto.denominacion}`);
        await this.checkDenominacionExists(dto.denominacion, 0);
        return this.repository.create(dto);
    }
    async update(id, dto) {
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
        await this.findOne(id);
        if (dto.denominacion)
            await this.checkDenominacionExists(dto.denominacion, id);
        return this.repository.update(id, dto);
    }
    async findAll(skip = 0, take = 10) {
        return this.repository.findAll(skip, take);
    }
    async findByDenominacionFiltered(denominacion, skip = 0, take = 10) {
        return this.repository.findByDenominacionFiltered(denominacion, skip, take);
    }
    async findOne(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return entity;
    }
    async remove(id) {
        const entity = await this.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return this.repository.remove(id);
    }
    async checkDenominacionExists(denominacion, id) {
        const exists = await this.repository.findByDenominacion(denominacion);
        if (exists && exists.id !== id) {
            this.logger.warn(`${this.ENTITY_NAME} Conflicto: denominación ya está en uso: ${denominacion}`);
            throw new common_1.ConflictException('Denominación ya en uso.');
        }
    }
    async findByIds(ids) {
        const roles = await this.repository.findByIds(ids);
        if (roles.length !== ids.length) {
            throw new common_1.NotFoundException('Uno o más roles no existen');
        }
        return roles;
    }
};
exports.RolService = RolService;
exports.RolService = RolService = RolService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IRolRepository')),
    __metadata("design:paramtypes", [Object])
], RolService);
//# sourceMappingURL=rol.service.js.map
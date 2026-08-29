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
var CondicionIvaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CondicionIvaService = void 0;
const common_1 = require("@nestjs/common");
const condicion_iva_mapper_1 = require("../../mappers/condicion-iva.mapper");
const paginacion_utils_1 = require("../../../../common/utils/pagination/paginacion-utils");
let CondicionIvaService = CondicionIvaService_1 = class CondicionIvaService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(CondicionIvaService_1.name);
        this.ENTITY_NAME = 'Condición IVA';
    }
    async create(dto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${dto.denominacion} a: ${dto.denominacion}`);
        await this.checkDenominacionExists(dto.denominacion, 0);
        return this.repository.create(dto);
    }
    async update(id, dto) {
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
        await this.findEntityById(id);
        if (dto.denominacion)
            await this.checkDenominacionExists(dto.denominacion, id);
        return this.repository.update(id, dto);
    }
    async findByDenominacionFiltered(denominacion, skip = 0, take = 10) {
        const result = await this.repository.findByDenominacionFiltered(denominacion, skip, take);
        const data = result.data.map((condicion) => condicion_iva_mapper_1.CondicionIvaMapper.toDto(condicion));
        return {
            data,
            total: paginacion_utils_1.PaginacionUtils.totalItems(result.total),
        };
    }
    async findAllFor() {
        const condiciones = await this.repository.findAllFor();
        const data = condiciones.map((condicion) => condicion_iva_mapper_1.CondicionIvaMapper.toDto(condicion));
        return {
            data,
            total: paginacion_utils_1.PaginacionUtils.totalItems(data.length),
        };
    }
    async findAllSinConsumidorFinal() {
        const condiciones = await this.repository.findAllFor();
        const data = condiciones
            .filter((condicion) => condicion.id !== 5)
            .map((condicion) => condicion_iva_mapper_1.CondicionIvaMapper.toDto(condicion));
        return {
            data,
            total: paginacion_utils_1.PaginacionUtils.totalItems(data.length),
        };
    }
    async findDtoById(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return condicion_iva_mapper_1.CondicionIvaMapper.toDto(entity);
    }
    async findEntityById(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return entity;
    }
    async remove(id) {
        const entity = await this.findEntityById(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return this.repository.remove(entity);
    }
    async checkDenominacionExists(denominacion, id) {
        const exists = await this.repository.findByDenominacion(denominacion);
        if (exists && exists.id !== id) {
            this.logger.warn(`${this.ENTITY_NAME} Conflicto: denominación ya está en uso: ${denominacion}`);
            throw new common_1.ConflictException('Denominación ya en uso.');
        }
    }
    async findAllListado() {
        const result = await this.repository.findAllListado();
        return result;
    }
    async findByIdConAuditoria(id) {
        const entity = await this.repository.findByIdConAuditoria(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        this.logger.warn(`FindOne : ${JSON.stringify(entity)}.`);
        return entity;
    }
};
exports.CondicionIvaService = CondicionIvaService;
exports.CondicionIvaService = CondicionIvaService = CondicionIvaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICondicionIvaRepository')),
    __metadata("design:paramtypes", [Object])
], CondicionIvaService);
//# sourceMappingURL=condicion-iva.service.js.map
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
var EmpresaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaService = void 0;
const common_1 = require("@nestjs/common");
const condicion_iva_service_1 = require("../../../../gutil/condicion-iva/application/services/condicion-iva.service");
let EmpresaService = EmpresaService_1 = class EmpresaService {
    constructor(repository, condicionIvaService) {
        this.repository = repository;
        this.condicionIvaService = condicionIvaService;
        this.logger = new common_1.Logger(EmpresaService_1.name);
        this.ENTITY_NAME = 'Empresa';
    }
    async create(dto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${dto.denominacion} a: ${dto.denominacion}`);
        await this.checkDenominacionExists(dto.denominacion, 0);
        const categoriaIVA = await this.condicionIvaService.findEntityById(dto.condicionIVAId);
        if (!categoriaIVA) {
            throw new common_1.NotFoundException(`Condicion  IVA con ID ${dto.condicionIVAId} no encontrada`);
        }
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${categoriaIVA.denominacion} a: ${categoriaIVA.denominacion}`);
        return this.repository.create(dto, categoriaIVA);
    }
    async update(id, dto) {
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
        await this.findOne(id);
        if (dto.denominacion)
            await this.checkDenominacionExists(dto.denominacion, id);
        const categoriaIVAId = dto.condicionIVAId;
        if (categoriaIVAId === undefined) {
            throw new Error('Condicion IVA ID is required');
        }
        const categoriaIVA = await this.condicionIvaService.findEntityById(categoriaIVAId);
        if (!categoriaIVA) {
            throw new common_1.NotFoundException(`Condición con ID ${dto.condicionIVAId} no encontrada`);
        }
        return this.repository.update(id, dto, categoriaIVA);
    }
    async findAll(skip = 0, take = 10) {
        return this.repository.findAll(skip, take);
    }
    async findByDenominacionFiltered(denominacion, skip = 0, take = 10) {
        this.logger.log(`  Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        return this.repository.findByDenominacionFiltered(denominacion, skip, take);
    }
    async findOne(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return entity;
    }
    async findOneWithRelations(id) {
        const entity = await this.repository.findOneWithRelations(id);
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
    async empresaExist(empresaId) {
        return await this.repository.empresaExist(empresaId);
    }
};
exports.EmpresaService = EmpresaService;
exports.EmpresaService = EmpresaService = EmpresaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IEmpresaRepository')),
    __metadata("design:paramtypes", [Object, condicion_iva_service_1.CondicionIvaService])
], EmpresaService);
//# sourceMappingURL=empresa.service.js.map
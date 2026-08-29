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
var PersonalService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalService = void 0;
const common_1 = require("@nestjs/common");
const personal_mapper_1 = require("../../mappers/personal.mapper");
const auditoria_mapper_1 = require("../../../../gestion-sistema/auditoria/mappers/auditoria.mapper");
const usuario_service_1 = require("../../../../gestion-usuario/usuario/application/services/usuario.service");
const message_front_util_1 = require("../../../../common/utils/message/message-front.util");
let PersonalService = PersonalService_1 = class PersonalService {
    constructor(repository, usuarioService) {
        this.repository = repository;
        this.usuarioService = usuarioService;
        this.logger = new common_1.Logger(PersonalService_1.name);
        this.ENTITY_NAME = 'Personal';
    }
    async create(dto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${dto.denominacion} a: ${dto.denominacion}`);
        await this.checkDenominacionExists(dto.denominacion, 0);
        const usuario = await this.usuarioService.findOne(dto.usuarioCreatedId);
        const entity = await this.repository.create(dto, usuario);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, dto.denominacion, 'creada');
    }
    async update(id, dto) {
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
        await this.findEntityById(id);
        if (dto.denominacion)
            await this.checkDenominacionExists(dto.denominacion, id);
        const usuario = await this.usuarioService.findOne(dto.usuarioUpdatedId);
        const entity = await this.repository.update(id, dto, usuario);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'editada');
    }
    async findBy(denominacion, skip = 0, take = 10, incluirEliminados = false) {
        this.logger.log(`  Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        const result = await this.repository.findBy(denominacion, skip, take, incluirEliminados);
        const data = result.data.map((personal) => personal_mapper_1.PersonalMapper.toSearchDto(personal));
        return {
            data,
            total: result.total,
        };
    }
    async findByIdConAuditoria(id) {
        const entity = await this.repository.findByIdConAuditoria(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return auditoria_mapper_1.AuditoriaMapper.mapPersonalToDto(entity);
    }
    async findDtoById(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        this.logger.log(`  2`);
        return personal_mapper_1.PersonalMapper.toDto(entity);
    }
    async findEntityById(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return entity;
    }
    async findAllFor(denominacion) {
        const result = await this.repository.findAllFor(denominacion);
        const data = result.map((personal) => personal_mapper_1.PersonalMapper.toDto(personal));
        return {
            data,
            total: 1,
        };
    }
    async findAllVendedorByDenominacion(denominacion) {
        const result = await this.repository.findAllVendedorFor(denominacion);
        const data = result.map((personal) => personal_mapper_1.PersonalMapper.toSearchDto(personal));
        return {
            data,
            total: 1,
        };
    }
    async remove(id) {
        const entity = await this.findEntityById(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        await this.repository.remove(id);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'eliminada');
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
};
exports.PersonalService = PersonalService;
exports.PersonalService = PersonalService = PersonalService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IPersonalRepository')),
    __metadata("design:paramtypes", [Object, usuario_service_1.UsuarioService])
], PersonalService);
//# sourceMappingURL=personal.service.js.map
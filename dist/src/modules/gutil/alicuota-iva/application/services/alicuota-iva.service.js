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
var AlicuotaIvaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicuotaIvaService = void 0;
const common_1 = require("@nestjs/common");
const paginacion_utils_1 = require("../../../../common/utils/pagination/paginacion-utils");
const alicuota_iva_mapper_1 = require("../../mappers/alicuota-iva.mapper");
const usuario_service_1 = require("../../../../gestion-usuario/usuario/application/services/usuario.service");
const message_front_util_1 = require("../../../../common/utils/message/message-front.util");
const atrituto_sistema_1 = require("../../../../common/utils/atrituto-sistema");
let AlicuotaIvaService = AlicuotaIvaService_1 = class AlicuotaIvaService {
    constructor(repository, usuarioService) {
        this.repository = repository;
        this.usuarioService = usuarioService;
        this.logger = new common_1.Logger(AlicuotaIvaService_1.name);
        this.ENTITY_NAME = 'AlicuotaIva';
    }
    async create(dto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${dto.denominacion} a: ${dto.denominacion}`);
        await this.checkDenominacionExists(dto.denominacion, 0);
        this.logger.log(`Creando 2vo ${this.ENTITY_NAME} con denominación: ${dto.denominacion} a: ${dto.denominacion}`);
        const entity = await this.repository.create(dto);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, dto.denominacion, 'creada');
    }
    async update(id, dto) {
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
        const marca = await this.findEntityById(id);
        (0, atrituto_sistema_1.ensureNotSistemaEntity)(marca, 'Marca');
        if (dto.denominacion)
            await this.checkDenominacionExists(dto.denominacion, id);
        const entity = await this.repository.update(id, dto);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'editada');
    }
    async findAllFor(denominacion) {
        const result = await this.repository.findAllFor(denominacion);
        const data = result.map((alicuota) => alicuota_iva_mapper_1.AlicuotaIvaMapper.toDto(alicuota));
        return {
            data,
            total: 1,
        };
    }
    async findAllSinSistemaFor(denominacion) {
        const result = await this.repository.findAllSinSistemaFor(denominacion);
        const data = result.map((marca) => alicuota_iva_mapper_1.AlicuotaIvaMapper.toDto(marca));
        return {
            data,
            total: 1,
        };
    }
    async findAllSistemaFor(denominacion) {
        const result = await this.repository.findAllSistemaFor(denominacion);
        const data = result.map((marca) => alicuota_iva_mapper_1.AlicuotaIvaMapper.toDto(marca));
        return {
            data,
            total: 1,
        };
    }
    async findBy(denominacion, skip = 0, take = 10) {
        this.logger.log(`  Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        const result = await this.repository.findBy(denominacion, skip, take);
        const data = result.data.map((marca) => alicuota_iva_mapper_1.AlicuotaIvaMapper.toDto(marca));
        return {
            data,
            total: paginacion_utils_1.PaginacionUtils.totalItems(result.total),
        };
    }
    async findDtoById(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return alicuota_iva_mapper_1.AlicuotaIvaMapper.toDto(entity);
    }
    async findEntityById(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return entity;
    }
    async remove(id, usuarioId) {
        const entity = await this.repository.findOne(id);
        if (!entity) {
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        }
        (0, atrituto_sistema_1.ensureNotSistemaEntity)(entity, 'Marca');
        const usuario = await this.usuarioService.findOne(usuarioId);
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${usuarioId} no encontrado.`);
        }
        await this.repository.remove(entity, usuario);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'eliminada');
    }
    async checkDenominacionExists(denominacion, id) {
        const exists = await this.repository.findByDenominacionWith(denominacion);
        if (exists && exists.id !== id) {
            this.logger.warn(`${this.ENTITY_NAME} Conflicto: denominación ya está en uso: ${denominacion}`);
            throw new common_1.ConflictException('Denominación ya en uso.');
        }
    }
    async findByIdConAuditoria(id) {
        const entity = await this.repository.findByIdConAuditoria(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        this.logger.warn(`FindOne : ${JSON.stringify(entity)}.`);
        return entity;
    }
};
exports.AlicuotaIvaService = AlicuotaIvaService;
exports.AlicuotaIvaService = AlicuotaIvaService = AlicuotaIvaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IAlicuotaIvaRepository')),
    __metadata("design:paramtypes", [Object, usuario_service_1.UsuarioService])
], AlicuotaIvaService);
//# sourceMappingURL=alicuota-iva.service.js.map
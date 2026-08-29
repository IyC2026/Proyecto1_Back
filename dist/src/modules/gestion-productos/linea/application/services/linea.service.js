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
var LineaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineaService = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("../../../../gestion-usuario/usuario/application/services/usuario.service");
const atrituto_sistema_1 = require("../../../../common/utils/atrituto-sistema");
const paginacion_utils_1 = require("../../../../common/utils/pagination/paginacion-utils");
const message_front_util_1 = require("../../../../common/utils/message/message-front.util");
const linea_mapper_1 = require("../../mappers/linea.mapper");
const politica_eliminacion_linea_service_1 = require("../../domain/services/politica-eliminacion-linea.service");
let LineaService = LineaService_1 = class LineaService {
    constructor(repository, validacionesService, usuarioService) {
        this.repository = repository;
        this.validacionesService = validacionesService;
        this.usuarioService = usuarioService;
        this.logger = new common_1.Logger(LineaService_1.name);
        this.ENTITY_NAME = 'Linea';
    }
    async create(dto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${dto.denominacion} a: ${dto.denominacion}`);
        await this.checkDenominacionExists(dto.denominacion, 0);
        const entity = await this.repository.create(dto);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'creada');
    }
    async update(id, dto) {
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
        const linea = await this.findEntityById(id);
        (0, atrituto_sistema_1.ensureNotSistemaEntity)(linea, 'Linea');
        if (dto.denominacion)
            await this.checkDenominacionExists(dto.denominacion, id);
        const entity = await this.repository.update(id, dto);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'editada');
    }
    async findByDenominacionFiltered(denominacion, skip = 0, take = 10, incluirEliminados = false) {
        this.logger.log(` ser Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        const result = await this.repository.findByDenominacionFiltered(denominacion, skip, take, incluirEliminados);
        const data = result.data.map((linea) => linea_mapper_1.LineaMapper.toDto(linea));
        return {
            data,
            total: paginacion_utils_1.PaginacionUtils.totalItems(result.total),
        };
    }
    async findAllFor(denominacion) {
        const result = await this.repository.findAllFor(denominacion);
        this.logger.log(` ser Buscando o ${denominacion}    result.length=${result.length}}`);
        const data = result.map((linea) => linea_mapper_1.LineaMapper.toDto(linea));
        return {
            data,
            total: 1,
        };
    }
    async findByIdConAuditoria(id) {
        const entity = await this.repository.findByIdConAuditoria(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        this.logger.warn(`FindOne : ${JSON.stringify(entity)}.`);
        return entity;
    }
    async findDtoById(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return linea_mapper_1.LineaMapper.toDto(entity);
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
        (0, atrituto_sistema_1.ensureNotSistemaEntity)(entity, 'Linea');
        const usuario = await this.usuarioService.findOne(usuarioId);
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${usuarioId} no encontrado.`);
        }
        const tieneProductosActivos = await this.validacionesService.tieneProductosActivosParaLinea(id);
        if (tieneProductosActivos) {
            throw new common_1.ConflictException('No se puede eliminar la marca porque está asociada a productos activos.');
        }
        await this.repository.remove(entity, usuario);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'eliminada');
    }
    async checkDenominacionExists(denominacion, id) {
        const denominacionNormalizada = denominacion.trim().toUpperCase();
        this.logger.log(` Verificando denominación: "${denominacionNormalizada}" para ID: ${id}`);
        const exists = await this.repository.findByDenominacionWith(denominacionNormalizada);
        this.logger.log(`Resultado: ${exists ? `Encontrado ID ${exists.id}` : 'No encontrado'}`);
        if (exists && exists.id !== id) {
            this.logger.warn(` Conflicto: denominación ya está en uso: ${denominacionNormalizada} (ID existente: ${exists.id})`);
            throw new common_1.ConflictException('Denominación ya en uso o esta eliminada.');
        }
        this.logger.log(`✅ Denominación disponible`);
    }
    async findAllListado() {
        const result = await this.repository.findAllListado();
        return result;
    }
};
exports.LineaService = LineaService;
exports.LineaService = LineaService = LineaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ILineaRepository')),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => politica_eliminacion_linea_service_1.PoliticaEliminacionLinea))),
    __metadata("design:paramtypes", [Object, politica_eliminacion_linea_service_1.PoliticaEliminacionLinea,
        usuario_service_1.UsuarioService])
], LineaService);
//# sourceMappingURL=linea.service.js.map
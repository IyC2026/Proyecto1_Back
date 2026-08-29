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
var ProveedorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorService = void 0;
const common_1 = require("@nestjs/common");
const localidad_service_1 = require("../../../../gutil/localidad/application/services/localidad.service");
const condicion_iva_service_1 = require("../../../../gutil/condicion-iva/application/services/condicion-iva.service");
const proveedor_mapper_1 = require("../../mappers/proveedor.mapper");
const usuario_service_1 = require("../../../../gestion-usuario/usuario/application/services/usuario.service");
const proveedor_validation_helper_1 = require("../../../helpers/proveedor-validation-helper");
const auditoria_mapper_1 = require("../../../../gestion-sistema/auditoria/mappers/auditoria.mapper");
const message_front_util_1 = require("../../../../common/utils/message/message-front.util");
const provincia_service_1 = require("../../../../gutil/provincia/application/services/provincia.service");
let ProveedorService = ProveedorService_1 = class ProveedorService {
    constructor(repository, condicionIvaService, localidadService, provinciaService, usuarioService, validator) {
        this.repository = repository;
        this.condicionIvaService = condicionIvaService;
        this.localidadService = localidadService;
        this.provinciaService = provinciaService;
        this.usuarioService = usuarioService;
        this.validator = validator;
        this.logger = new common_1.Logger(ProveedorService_1.name);
        this.ENTITY_NAME = 'Proveedor';
    }
    async create(dto) {
        const { usuario, categoriaIVA } = await this.validator.validateCreateProveedor(dto);
        const localidad = await this.localidadService.findEntityById(dto.domicilio.localidadId);
        if (!localidad) {
            throw new common_1.NotFoundException(`localidad con ID ${dto.domicilio.localidadId} no encontrada`);
        }
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con loacliadad: ${dto.domicilio.localidadId}`);
        const entity = await this.repository.create(dto, categoriaIVA, localidad, usuario);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, dto.denominacion, 'creada');
    }
    async update(id, dto) {
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
        const { usuario, categoriaIVA } = await this.validator.validateUpdateProveedor(id, dto);
        if (!dto.domicilio?.localidadId) {
            throw new common_1.BadRequestException('El ID de la localidad es obligatorio.');
        }
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${dto.domicilio?.localidadId}`);
        const localidad = await this.localidadService.findEntityById(dto.domicilio.localidadId);
        if (!localidad) {
            throw new common_1.NotFoundException(`localidad con ID ${dto.domicilio.localidadId} no encontrada`);
        }
        const entity = await this.repository.update(id, dto, categoriaIVA, localidad, usuario);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'editada');
    }
    async findBy(empresaId, denominacion, condicionIvaId, conSaldo, skip = 0, take = 10, incluirEliminados = false) {
        this.logger.log(`  Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        const result = await this.repository.findBy(denominacion, condicionIvaId, incluirEliminados, empresaId, conSaldo, skip, take);
        this.logger.log(`  Buscando 4o ${denominacion}  skip=${skip}, take=${take}`);
        const data = result.data.map((proveedor) => proveedor_mapper_1.ProveedorMapper.toOperadorSearchDto(proveedor, empresaId));
        return {
            data,
            total: result.total,
        };
    }
    async findAllByDenominacion(empresaId, denominacion) {
        this.logger.log(`  Buscando o ${denominacion} `);
        const proveedores = await this.repository.findAllByDenominacion(denominacion);
        const data = proveedores.map((proveedor) => proveedor_mapper_1.ProveedorMapper.toOperadorDto(proveedor, empresaId));
        return {
            data,
            total: data.length,
        };
    }
    async findAllByDenominacion2(empresaId, denominacion) {
        this.logger.log(`  Buscando o ${denominacion} `);
        const proveedores = await this.repository.findAllByDenominacion(denominacion);
        const data = proveedores.map((proveedor) => proveedor_mapper_1.ProveedorMapper.toOperadorSearchDto(proveedor, empresaId));
        return {
            data,
            total: data.length,
        };
    }
    async findAllByTipo(empresaId, denominacion, compra, gasto) {
        this.logger.log(`  Buscando by tipo    ${denominacion} `);
        const proveedores = await this.repository.findAllByTipo(denominacion, compra, gasto);
        const data = proveedores.map((proveedor) => proveedor_mapper_1.ProveedorMapper.toOperadorSearchDto(proveedor, empresaId));
        return {
            data,
            total: data.length,
        };
    }
    async findAllCondicionIva() {
        return this.condicionIvaService.findAllSinConsumidorFinal();
    }
    async findAllLocalidad() {
        return this.localidadService.findAllFor();
    }
    async findAllLocalidadFor(provinciaId) {
        return this.localidadService.findAllForProvincia(provinciaId);
    }
    async findAllProvincia() {
        return this.provinciaService.findAllFor();
    }
    async buscarCondicionIvaDesdeCliente(id) {
        return this.condicionIvaService.findEntityById(id);
    }
    async findByIdConAuditoria(id) {
        const entity = await this.repository.findByIdConAuditoria(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return auditoria_mapper_1.AuditoriaMapper.mapProveedorToDto(entity);
    }
    async findDtoById(id, empresaId) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        this.logger.log(`  Buscando o`);
        return proveedor_mapper_1.ProveedorMapper.toDto2(entity, empresaId);
    }
    async findEntityById(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return entity;
    }
    async remove(id, usuarioId) {
        const entity = await this.findEntityById(id);
        if (!entity) {
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        }
        const usuario = await this.usuarioService.findOne(usuarioId);
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${usuarioId} no encontrado.`);
        }
        await this.repository.remove(id, usuario);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'eliminada');
    }
    async checkDenominacionExists(denominacion, id) {
        const exists = await this.repository.findByDenominacion(denominacion);
        if (exists && exists.id !== id) {
            this.logger.warn(`${this.ENTITY_NAME} Conflicto: denominación ya está en uso: ${denominacion}`);
            throw new common_1.ConflictException('Denominación ya en uso.');
        }
    }
    async findAllFor(denominacion) {
        const result = await this.repository.findAllFor(denominacion);
        const data = result.map((proveedor) => proveedor_mapper_1.ProveedorMapper.toDto(proveedor));
        return {
            data,
            total: data.length,
        };
    }
    async findAllSistemaFor(denominacion) {
        const result = await this.repository.findAllSistemaFor(denominacion);
        const data = result.map((proveedor) => proveedor_mapper_1.ProveedorMapper.toDto(proveedor));
        return {
            data,
            total: data.length,
        };
    }
    async findAllSinSistemaFor(denominacion) {
        const result = await this.repository.findAllSinSistemaFor(denominacion);
        const data = result.map((proveedor) => proveedor_mapper_1.ProveedorMapper.toDto(proveedor));
        return {
            data,
            total: data.length,
        };
    }
};
exports.ProveedorService = ProveedorService;
exports.ProveedorService = ProveedorService = ProveedorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IProveedorRepository')),
    __metadata("design:paramtypes", [Object, condicion_iva_service_1.CondicionIvaService,
        localidad_service_1.LocalidadService,
        provincia_service_1.ProvinciaService,
        usuario_service_1.UsuarioService,
        proveedor_validation_helper_1.ProveedorValidationHelper])
], ProveedorService);
//# sourceMappingURL=proveedor.service.js.map
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
var ClienteService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const localidad_service_1 = require("../../../../gutil/localidad/application/services/localidad.service");
const condicion_iva_service_1 = require("../../../../gutil/condicion-iva/application/services/condicion-iva.service");
const cliente_mapper_1 = require("../../mappers/cliente.mapper");
const usuario_service_1 = require("../../../../gestion-usuario/usuario/application/services/usuario.service");
const cliente_validation_helper_1 = require("../../../helpers/cliente-validation-helper");
const auditoria_mapper_1 = require("../../../../gestion-sistema/auditoria/mappers/auditoria.mapper");
const message_front_util_1 = require("../../../../common/utils/message/message-front.util");
const personal_service_1 = require("../../../personal/application/services/personal.service");
const empresa_service_1 = require("../../../empresa/application/services/empresa.service");
const provincia_service_1 = require("../../../../gutil/provincia/application/services/provincia.service");
let ClienteService = ClienteService_1 = class ClienteService {
    constructor(repository, condicionIvaService, localidadService, provinciaService, personalService, usuarioService, empresaService, validator) {
        this.repository = repository;
        this.condicionIvaService = condicionIvaService;
        this.localidadService = localidadService;
        this.provinciaService = provinciaService;
        this.personalService = personalService;
        this.usuarioService = usuarioService;
        this.empresaService = empresaService;
        this.validator = validator;
        this.logger = new common_1.Logger(ClienteService_1.name);
        this.ENTITY_NAME = 'Cliente';
    }
    async create(dto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${dto.denominacion} a: ${dto.denominacion}`);
        const { usuario, categoriaIVA, personal } = await this.validator.validateCreateCliente(dto);
        const localidad = await this.localidadService.findEntityById(dto.domicilio.localidadId);
        if (!localidad) {
            throw new common_1.NotFoundException(`localidad con ID ${dto.domicilio.localidadId} no encontrada`);
        }
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con loacliadad: ${dto.domicilio.localidadId}`);
        const entity = await this.repository.create(dto, categoriaIVA, localidad, personal, usuario);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, dto.denominacion, 'creada');
    }
    async update(id, dto) {
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
        const { usuario, categoriaIVA, personal } = await this.validator.validateUpdateCliente(id, dto);
        if (!dto.domicilio?.localidadId) {
            throw new common_1.BadRequestException('El ID de la localidad es obligatorio.');
        }
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${dto.domicilio?.localidadId}`);
        const localidad = await this.localidadService.findEntityById(dto.domicilio.localidadId);
        if (!localidad) {
            throw new common_1.NotFoundException(`localidad con ID ${dto.domicilio.localidadId} no encontrada`);
        }
        const entity = await this.repository.update(id, dto, categoriaIVA, localidad, personal, usuario);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'editada');
    }
    async findByDenominacionFiltered(empresaId, denominacion, condicionIvaId, conSaldo, skip = 0, take = 10, incluirEliminados = false) {
        this.logger.log(`  Buscando 111o ${denominacion}  skip=${skip}, take=${take}`);
        const result = await this.repository.findBy(denominacion, condicionIvaId, incluirEliminados, empresaId, conSaldo, skip, take);
        const data = result.data.map((cliente) => cliente_mapper_1.ClienteMapper.toOperadorSearchDto(cliente, empresaId));
        return {
            data,
            total: result.total,
        };
    }
    async findAllByDenominacion(empresaId, denominacion) {
        this.logger.log(`  Buscando o ${denominacion} `);
        const clientes = await this.repository.findAllByDenominacion(denominacion);
        const data = clientes.map((cliente) => cliente_mapper_1.ClienteMapper.toOperadorSearchDto(cliente, empresaId));
        return {
            data,
            total: data.length,
        };
    }
    async findAllByDenominacionAndCodigo(empresaId, denominacion) {
        this.logger.log(`  Buscando o ${denominacion} `);
        const clientes = await this.repository.findAllByDenominacionAndCodigo(denominacion);
        const data = clientes.map((cliente) => cliente_mapper_1.ClienteMapper.toOperadorSearchDto(cliente, 1));
        return {
            data,
            total: data.length,
        };
    }
    async findAllByVendedorDenominacion(denominacion) {
        this.logger.log(`Buscando ${denominacion} `);
        return await this.personalService.findAllVendedorByDenominacion(denominacion);
    }
    async findAllCondicionIva() {
        return this.condicionIvaService.findAllFor();
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
        return auditoria_mapper_1.AuditoriaMapper.mapClienteToDto(entity);
    }
    async findDtoById(id, empresaId) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        this.logger.log(`  Buscando 3 `);
        return cliente_mapper_1.ClienteMapper.toOperadorDto(entity, empresaId);
    }
    async findEntityById(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return entity;
    }
    async findEntityByIdWithRelations(id) {
        const entity = await this.repository.findOneWithRelations(id);
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
    async checkCuitOrDniExists(cuit, dni, idClienteActual) {
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = ClienteService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IClienteRepository')),
    __metadata("design:paramtypes", [Object, condicion_iva_service_1.CondicionIvaService,
        localidad_service_1.LocalidadService,
        provincia_service_1.ProvinciaService,
        personal_service_1.PersonalService,
        usuario_service_1.UsuarioService,
        empresa_service_1.EmpresaService,
        cliente_validation_helper_1.ClienteValidationHelper])
], ClienteService);
//# sourceMappingURL=cliente.service.js.map
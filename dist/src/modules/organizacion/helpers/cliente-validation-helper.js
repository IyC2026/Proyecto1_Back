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
var ClienteValidationHelper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteValidationHelper = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("../../gestion-usuario/usuario/application/services/usuario.service");
const condicion_iva_validation_helper_1 = require("../../gutil/condicion-iva/helpers/condicion-iva-validation-helper");
const personal_service_1 = require("../personal/application/services/personal.service");
let ClienteValidationHelper = ClienteValidationHelper_1 = class ClienteValidationHelper {
    constructor(condicionIvaValidationHelper, usuarioService, personalService, clienteRepository) {
        this.condicionIvaValidationHelper = condicionIvaValidationHelper;
        this.usuarioService = usuarioService;
        this.personalService = personalService;
        this.clienteRepository = clienteRepository;
        this.logger = new common_1.Logger(ClienteValidationHelper_1.name);
    }
    async validateAndGetCondicionIva(dto) {
        this.logger.log(`Creando un nuevo g1`);
        const condicionIva = await this.condicionIvaValidationHelper.validateAndGetCondicionIva(dto.condicionIvaId);
        this.logger.log(`condicionIva: ${JSON.stringify(condicionIva)}`);
        this.condicionIvaValidationHelper.validateCondicionIvaRequirements(condicionIva, dto);
        return condicionIva;
    }
    async validateAndGetPersonal(dto) {
        this.logger.log(`Creando un nuevo g1`);
        const personal = await this.personalService.findEntityById(dto.vendedorId);
        return personal;
    }
    async validateAndGetUsuario(id) {
        const usuario = await this.usuarioService.findOne(id);
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }
    async validateAndGetCuitUnique(cuit, idActual) {
        if (!cuit?.trim())
            return;
        const existente = await this.clienteRepository.findByCuit(cuit.trim());
        if (existente && existente.id !== idActual) {
            throw new common_1.BadRequestException(`Ya existe un cliente con CUIT ${cuit}`);
        }
    }
    async validateAndGetDniUnique(dni, idActual) {
        if (!dni?.trim())
            return;
        const existente = await this.clienteRepository.findByDni(dni.trim());
        if (existente && existente.id !== idActual) {
            throw new common_1.BadRequestException(`Ya existe un cliente con Dni ${dni}`);
        }
    }
    async validateAndGetDenominacionUnique(denominacion, id) {
        const exists = await this.clienteRepository.findByDenominacion(denominacion);
        if (exists && exists.id !== id) {
            this.logger.warn(`Conflicto: denominación ya está en uso: ${denominacion}`);
            throw new common_1.ConflictException('Denominación ya en uso.');
        }
    }
    async validateCreateCliente(dto) {
        const denominacion = await this.validateAndGetDenominacionUnique(dto.denominacion, 0);
        const personal = await this.validateAndGetPersonal(dto);
        const usuario = await this.validateAndGetUsuario(dto.usuarioCreatedId);
        const categoriaIVA = await this.validateAndGetCondicionIva(dto);
        await this.validateAndGetCuitUnique(dto.cuit, 0);
        return { usuario, categoriaIVA, personal };
    }
    async validateUpdateCliente(id, dto) {
        await this.clienteRepository.findOne(id);
        if (dto.denominacion) {
            await this.validateAndGetDenominacionUnique(dto.denominacion, id);
        }
        const usuario = await this.validateAndGetUsuario(dto.usuarioUpdatedId);
        const categoriaIVA = await this.validateAndGetCondicionIva(dto);
        const personal = await this.validateAndGetPersonal(dto);
        await this.validateAndGetCuitUnique(dto.cuit, id);
        await this.validateAndGetDniUnique(dto.dni, id);
        return { usuario, categoriaIVA, personal };
    }
};
exports.ClienteValidationHelper = ClienteValidationHelper;
exports.ClienteValidationHelper = ClienteValidationHelper = ClienteValidationHelper_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)('IClienteRepository')),
    __metadata("design:paramtypes", [condicion_iva_validation_helper_1.CondicionIvaValidationHelper,
        usuario_service_1.UsuarioService,
        personal_service_1.PersonalService, Object])
], ClienteValidationHelper);
//# sourceMappingURL=cliente-validation-helper.js.map
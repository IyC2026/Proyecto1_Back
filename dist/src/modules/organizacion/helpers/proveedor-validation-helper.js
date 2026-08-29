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
var ProveedorValidationHelper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorValidationHelper = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("../../gestion-usuario/usuario/application/services/usuario.service");
const condicion_iva_validation_helper_1 = require("../../gutil/condicion-iva/helpers/condicion-iva-validation-helper");
let ProveedorValidationHelper = ProveedorValidationHelper_1 = class ProveedorValidationHelper {
    constructor(condicionIvaValidationHelper, usuarioService, proveedorRepository) {
        this.condicionIvaValidationHelper = condicionIvaValidationHelper;
        this.usuarioService = usuarioService;
        this.proveedorRepository = proveedorRepository;
        this.logger = new common_1.Logger(ProveedorValidationHelper_1.name);
    }
    async validateAndGetCondicionIva(dto) {
        this.logger.log(`Creando un nuevo g1`);
        const condicionIva = await this.condicionIvaValidationHelper.validateAndGetCondicionIva(dto.condicionIvaId);
        this.logger.log(`condicionIva: ${JSON.stringify(condicionIva)}`);
        this.condicionIvaValidationHelper.validateCondicionIvaRequirements(condicionIva, dto);
        return condicionIva;
    }
    async validateAndGetUsuario(id) {
        const usuario = await this.usuarioService.findOne(id);
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }
    async validateAndGetCuitUnique(cuit, idProveedorActual) {
        if (!cuit?.trim())
            return;
        const existente = await this.proveedorRepository.findByCuit(cuit.trim());
        if (existente && existente.id !== idProveedorActual) {
            throw new common_1.BadRequestException(`Ya existe un proveedor con CUIT ${cuit}`);
        }
    }
    async validateAndGetDenominacionUnique(denominacion, id) {
        const exists = await this.proveedorRepository.findByDenominacion(denominacion);
        if (exists && exists.id !== id) {
            this.logger.warn(`Conflicto: denominación ya está en uso: ${denominacion}`);
            throw new common_1.ConflictException('Denominación ya en uso.');
        }
    }
    async validateCreateProveedor(dto) {
        const denominacion = await this.validateAndGetDenominacionUnique(dto.denominacion, 0);
        const usuario = await this.validateAndGetUsuario(dto.usuarioCreatedId);
        const categoriaIVA = await this.validateAndGetCondicionIva(dto);
        await this.validateAndGetCuitUnique(dto.cuit, 0);
        return { usuario, categoriaIVA };
    }
    async validateUpdateProveedor(id, dto) {
        await this.proveedorRepository.findOne(id);
        if (dto.denominacion) {
            await this.validateAndGetDenominacionUnique(dto.denominacion, id);
        }
        const usuario = await this.validateAndGetUsuario(dto.usuarioUpdatedId);
        const categoriaIVA = await this.validateAndGetCondicionIva(dto);
        await this.validateAndGetCuitUnique(dto.cuit, id);
        return { usuario, categoriaIVA };
    }
};
exports.ProveedorValidationHelper = ProveedorValidationHelper;
exports.ProveedorValidationHelper = ProveedorValidationHelper = ProveedorValidationHelper_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('IProveedorRepository')),
    __metadata("design:paramtypes", [condicion_iva_validation_helper_1.CondicionIvaValidationHelper,
        usuario_service_1.UsuarioService, Object])
], ProveedorValidationHelper);
//# sourceMappingURL=proveedor-validation-helper.js.map
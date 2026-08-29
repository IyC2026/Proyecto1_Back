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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoValidator = void 0;
const common_1 = require("@nestjs/common");
const usuario_validator_1 = require("../../../../common/utils/validation/usuario-validator");
const marca_service_1 = require("../../../marca/application/services/marca.service");
let ProductoValidator = class ProductoValidator {
    constructor(marcaService, usuarioValidator, repository) {
        this.marcaService = marcaService;
        this.usuarioValidator = usuarioValidator;
        this.repository = repository;
        this.ENTITY_NAME = 'Producto';
    }
    assertEntidadValida(entidad, tipo) {
        if (!entidad) {
            throw new common_1.NotFoundException(`${tipo} no encontrada`);
        }
        if (entidad.sistema === 1) {
            throw new common_1.BadRequestException(`${tipo} ${entidad.id} está marcada como del sistema y no puede usarse.`);
        }
    }
    async validarMarcaLinea(dto, tipo) {
        const { lineaId, marcaId } = dto;
        if (lineaId === undefined) {
            throw new Error('Linea ID is required');
        }
        if (marcaId === undefined) {
            throw new Error('Marca ID is required');
        }
        let marca, linea;
        [marca] = await Promise.all([
            this.marcaService.findEntityById(marcaId),
        ]);
        if (tipo === 0) {
            this.assertEntidadValida(marca, 'Marca');
            this.assertEntidadValida(linea, 'Línea');
        }
        return { marca, linea, };
    }
    validarCamposRequeridos(dto) {
    }
    async validar(dto, tipo) {
        this.validarCamposRequeridos(dto);
        await this.validateUniqueDenominacion(dto.denominacion, 0);
        return await this.validarMarcaLinea(dto, tipo);
    }
    async validarUsuarioExiste(id) {
        const usuario = await this.usuarioValidator.validarUsuarioExiste(id);
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }
    async validateUniqueDenominacion(denominacion, excludeId) {
        const existingProduct = await this.repository.existsByDenominacion(denominacion, excludeId);
        if (existingProduct) {
            throw new common_1.ConflictException(`La denominación "${denominacion}" ya está en uso.`);
        }
    }
};
exports.ProductoValidator = ProductoValidator;
exports.ProductoValidator = ProductoValidator = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('IProductoRepository')),
    __metadata("design:paramtypes", [marca_service_1.MarcaService,
        usuario_validator_1.UsuarioValidator, Object])
], ProductoValidator);
//# sourceMappingURL=producto-validator.helper.js.map
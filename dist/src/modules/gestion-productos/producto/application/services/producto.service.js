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
var ProductoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoService = void 0;
const common_1 = require("@nestjs/common");
const proveedor_service_1 = require("../../../../organizacion/proveedor/application/services/proveedor.service");
const paginacion_utils_1 = require("../../../../common/utils/pagination/paginacion-utils");
const usuario_service_1 = require("../../../../gestion-usuario/usuario/application/services/usuario.service");
const atrituto_sistema_1 = require("../../../../common/utils/atrituto-sistema");
const auditoria_mapper_1 = require("../../../../gestion-sistema/auditoria/mappers/auditoria.mapper");
const message_front_util_1 = require("../../../../common/utils/message/message-front.util");
const producto_mapper_1 = require("../../mappers/producto.mapper");
const linea_service_1 = require("../../../linea/application/services/linea.service");
const marca_service_1 = require("../../../marca/application/services/marca.service");
const producto_intrinsic_validation_service_ts_1 = require("../../domain/services/producto-intrinsic-validation.service.ts");
const producto_validation_service_ts_1 = require("../../domain/services/producto-validation.service.ts");
const producto_related_entities_validator_ts_1 = require("../../infraestructure/validators/producto-related-entities.validator.ts");
const producto_uniqueness_validator_ts_1 = require("../../infraestructure/validators/producto-uniqueness.validator.ts");
const usuario_validator_1 = require("../../../../common/utils/validation/usuario-validator");
const producto_delete_policy_1 = require("../policies/producto-delete.policy");
let ProductoService = ProductoService_1 = class ProductoService {
    constructor(repository, lineaService, marcaService, proveedorService, usuarioService, intrinsicValidationService, validationService, relatedEntitiesValidator, uniquenessValidator, usuarioValidator, productoDeletePolicy) {
        this.repository = repository;
        this.lineaService = lineaService;
        this.marcaService = marcaService;
        this.proveedorService = proveedorService;
        this.usuarioService = usuarioService;
        this.intrinsicValidationService = intrinsicValidationService;
        this.validationService = validationService;
        this.relatedEntitiesValidator = relatedEntitiesValidator;
        this.uniquenessValidator = uniquenessValidator;
        this.usuarioValidator = usuarioValidator;
        this.productoDeletePolicy = productoDeletePolicy;
        this.logger = new common_1.Logger(ProductoService_1.name);
        this.ENTITY_NAME = 'Producto';
    }
    async create(dto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${dto.denominacion} a: ${dto.denominacion}`);
        const { marca, linea, usuario } = await this.validarYPrepararCreacion(dto);
        const entity = await this.repository.create(dto, linea, marca, usuario);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'creada');
    }
    async update(id, dto) {
        this.logger.log(`Actualizandox  ${this.ENTITY_NAME} con ID: ${id}`);
        const { marca, linea, usuario } = await this.validarYPrepararActualizacion(id, dto);
        const entity = await this.repository.update(id, dto, linea, marca, usuario);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'editada');
    }
    async findByRapido(codigo, exacto, skip, take) {
        this.logger.warn(`service`);
        const result = await this.repository.findByRapido(codigo, exacto, skip, take);
        return {
            data: result.data.map((producto) => {
                return producto_mapper_1.ProductoMapper.toBusquedaDto(producto);
            }),
            total: paginacion_utils_1.PaginacionUtils.totalItems(result.total),
        };
    }
    async findBy(denominacion, codigoProveedor, codProveedorExacto, codigoReferencia, marca_id, linea_id, proveedor_id, conStock, skip, take) {
        this.logger.warn(`service`);
        const result = await this.repository.findBy(denominacion, codigoProveedor, codProveedorExacto, codigoReferencia, marca_id, linea_id, proveedor_id, conStock, skip, take);
        return {
            data: result.data.map((producto) => {
                return producto_mapper_1.ProductoMapper.toBusquedaDto(producto);
            }),
            total: paginacion_utils_1.PaginacionUtils.totalItems(result.total),
        };
    }
    async buscarMarcaDesdeProducto(id) {
        return this.marcaService.findEntityById(id);
    }
    async buscarLineaDesdeProducto(id) {
        return this.lineaService.findEntityById(id);
    }
    async findByIdConAuditoria(id) {
        const entity = await this.repository.findByIdConAuditoria(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return auditoria_mapper_1.AuditoriaMapper.mapProductoToDto(entity);
    }
    async findDtoById(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        this.logger.log(`b1x`);
        return producto_mapper_1.ProductoMapper.toDto(entity);
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
        (0, atrituto_sistema_1.ensureNotSistemaEntity)(entity, 'Producto');
        const usuario = await this.usuarioService.findOne(usuarioId);
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${usuarioId} no encontrado.`);
        }
        await this.repository.remove(entity, usuario);
        return message_front_util_1.MessageFrontUtils.createSimple(`${this.ENTITY_NAME}`, entity.denominacion, 'eliminada');
    }
    async findAllForLineas(denominacion) {
        return this.lineaService.findAllFor(denominacion);
    }
    async findAllForMarcas(denominacion) {
        return this.marcaService.findAllFor(denominacion);
    }
    async findByDenominacionCodigoProveedorFiltered(denominacion, skip = 0, take = 10) {
        this.logger.log(`  Buscando en srvice producto o ${denominacion}  skip=${skip}, take=${take}`);
        const result = await this.repository.findByDenominacionCodigoProveedorFiltered(denominacion, skip, take);
        this.logger.log(result);
        return {
            data: result.data.map((producto) => {
                return producto_mapper_1.ProductoMapper.toBusquedaDto(producto);
            }),
            total: paginacion_utils_1.PaginacionUtils.totalItems(result.total),
        };
    }
    async existsProductosActivosByMarca(marcaId) {
        return this.repository.existsProductosActivosByMarca(marcaId);
    }
    async existsProductosActivosByLinea(lineaId) {
        return this.repository.existsProductosActivosByLinea(lineaId);
    }
    async findByIds(ids) {
        return this.repository.findByIds(ids);
    }
    async incrementarStock(uow, productoId, cantidad, origen) {
        return this.ajustarStockInterno(uow, productoId, cantidad, origen);
    }
    async decrementarStock(uow, productoId, cantidad, origen) {
        return this.ajustarStockInterno(uow, productoId, -cantidad, origen);
    }
    async ajustarStockInterno(uow, productoId, delta, origen) {
        const producto = await this.repository.findOne(productoId);
        if (!producto) {
            throw new Error(`Producto con ID ${productoId} no encontrado`);
        }
        const stockActual = producto.stock ?? 0;
        const nuevoStock = stockActual + delta;
        producto.stock = nuevoStock;
        await this.repository.updateEntity(uow, producto);
        this.logger.log(`[StockService] ${origen ?? 'Desconocido'} → ${stockActual} → ${nuevoStock}`);
        return nuevoStock;
    }
    async validarYPrepararCreacion(dto) {
        this.intrinsicValidationService.validarDatosBasicos({
            denominacion: dto.denominacion,
            marcaId: dto.marcaId,
            lineaId: dto.lineaId,
            alicuotaIva: dto.alicuotaIva,
        });
        await this.uniquenessValidator.validarDenominacionUnica(dto.denominacion);
        if (dto.codigoProveedor) {
            await this.uniquenessValidator.validarCodigoProveedorUnico(dto.codigoProveedor, 0);
        }
        const { marca, linea, } = await this.relatedEntitiesValidator.validarYObtenerEntidadesRelacionadas(dto.marcaId, dto.lineaId);
        this.validationService.validarEntidadesRelacionadas(marca, linea);
        const usuario = await this.usuarioValidator.validarUsuarioExiste(dto.usuarioCreatedId);
        return { marca, linea, usuario };
    }
    async validarYPrepararActualizacion(id, dto) {
        const productoActual = await this.repository.findOne(id);
        if (!productoActual)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        if (productoActual.lineaId == null ||
            productoActual.marcaId == null) {
            throw new common_1.InternalServerErrorException('Producto en estado inválido');
        }
        this.intrinsicValidationService.validarDatosBasicos({
            denominacion: dto.denominacion ?? productoActual.denominacion,
            marcaId: dto.marcaId ?? productoActual.marcaId,
            lineaId: dto.lineaId ?? productoActual.lineaId,
            alicuotaIva: dto.alicuotaIva ?? productoActual.alicuotaIva,
        });
        if (dto.denominacion) {
            await this.uniquenessValidator.validarDenominacionUnica(dto.denominacion, id);
        }
        const { marca, linea, } = await this.relatedEntitiesValidator.validarYObtenerEntidadesRelacionadas(dto.marcaId ?? productoActual.marcaId, dto.lineaId ?? productoActual.lineaId);
        this.validationService.validarEntidadesRelacionadas(marca, linea);
        const usuario = await this.usuarioValidator.validarUsuarioExiste(dto.usuarioUpdatedId);
        return { marca, linea, usuario };
    }
};
exports.ProductoService = ProductoService;
exports.ProductoService = ProductoService = ProductoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IProductoRepository')),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => marca_service_1.MarcaService))),
    __metadata("design:paramtypes", [Object, linea_service_1.LineaService,
        marca_service_1.MarcaService,
        proveedor_service_1.ProveedorService,
        usuario_service_1.UsuarioService,
        producto_intrinsic_validation_service_ts_1.ProductoIntrinsicValidationService,
        producto_validation_service_ts_1.ProductoValidationService,
        producto_related_entities_validator_ts_1.ProductoRelatedEntitiesValidator,
        producto_uniqueness_validator_ts_1.ProductoUniquenessValidator,
        usuario_validator_1.UsuarioValidator,
        producto_delete_policy_1.ProductoDeletePolicy])
], ProductoService);
//# sourceMappingURL=producto.service.js.map
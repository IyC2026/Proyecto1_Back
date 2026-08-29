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
var ProductoRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRepository = void 0;
const common_1 = require("@nestjs/common");
const producto_persistence_adapters_1 = require("./producto.persistence-adapters");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
let ProductoRepository = ProductoRepository_1 = class ProductoRepository {
    constructor(persistenceService) {
        this.persistenceService = persistenceService;
        this.logger = new common_1.Logger(ProductoRepository_1.name);
        this.ENTITY_NAME = 'Producto';
    }
    findByIds(ids) {
        throw new Error('Method not implemented.');
    }
    async create(data, linea, marca, usuario) {
        this.logger.log(`Creando un nuevo `);
        try {
            return await this.persistenceService.create(data, linea, marca, usuario);
        }
        catch (error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: `);
            throw new database_connection_exception_1.DatabaseConnectionException('No se pudo crear la entidad en la base de datos.');
        }
    }
    async update(id, data, linea, marca, usuario) {
        return this.persistenceService.update(id, data, linea, marca, usuario);
    }
    async updateEntity(uow, data) {
        return this.persistenceService.updateEntity(uow, data);
    }
    async findBy(denominacion, codigoProveedor, codProveedorExacto, codigoReferencia, marca_id, linea_id, proveedor_id, conStock, skip, take) {
        return this.persistenceService.findBy(denominacion, codigoProveedor, codProveedorExacto, codigoReferencia, marca_id, linea_id, proveedor_id, conStock, skip, take);
    }
    async findByRapido(codigo, exacto, skip, take) {
        return this.persistenceService.findByRapido(codigo, exacto, skip, take);
    }
    async findOne(id) {
        const entity = await this.persistenceService.findOne(id);
        return entity;
    }
    async findByIdConAuditoria(id) {
        const entity = await this.persistenceService.findByIdConAuditoria(id);
        return entity;
    }
    async remove(producto, usuario) {
        const entity = this.persistenceService.remove(producto, usuario);
        return entity;
    }
    async isCodigoProveedorDuplicado(codigoProveedor, id) {
        return this.persistenceService.isCodigoProveedorDuplicado(codigoProveedor, id);
    }
    async actualizarPrecio(id, dto, usuario) {
        return this.persistenceService.actualizarPrecio(id, dto, usuario);
    }
    async findByDenominacion(denominacion) {
        const entity = await this.persistenceService.findByDenominacion(denominacion);
        if (!entity) {
            this.logger.warn(`No se encontró ${this.ENTITY_NAME} con denominación: ${denominacion}`);
            return null;
        }
        return entity;
    }
    async findByDenominacionCodigoProveedorFiltered(denominacion, skip = 0, take = 10) {
        this.logger.log(`Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        return this.persistenceService.findByDenominacionCodigoProveedorFiltered(denominacion, skip, take);
    }
    async existsProductosActivosByMarca(marcaId) {
        return this.persistenceService.existsProductosActivosByMarca(marcaId);
    }
    async existsProductosActivosByLinea(lineaId) {
        return this.persistenceService.existsProductosActivosByLinea(lineaId);
    }
    async findByIdWithoutRelations(id) {
        return this.persistenceService.findByIdWithoutRelations(id);
    }
    async existsByDenominacion(denominacion, excludeId) {
        return this.persistenceService.existsByDenominacion(denominacion, excludeId);
    }
    async existsByCodigoProveedor(codigoProveedor, excludeId) {
        return this.persistenceService.existsByCodigoProveedor(codigoProveedor, excludeId);
    }
};
exports.ProductoRepository = ProductoRepository;
exports.ProductoRepository = ProductoRepository = ProductoRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [producto_persistence_adapters_1.ProductoPersistenceAdapter])
], ProductoRepository);
//# sourceMappingURL=producto.repository.js.map
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
var ProductoPersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transactional_decoratos_1 = require("../../../../common/decorators/transactional.decoratos");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const entity_notFound_exceptions_1 = require("../../../../common/exceptions/entity-notFound-exceptions");
const linea_entity_1 = require("../../../linea/domain/entities/linea.entity");
const marca_entity_1 = require("../../../marca/domain/entities/marca.entity");
const usuario_entity_1 = require("../../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const typeorm_2 = require("typeorm");
const producto_entity_1 = require("../../domain/entities/producto.entity");
const create_producto_dto_1 = require("../../dto/create-producto.dto");
const update_precio_dto_1 = require("../../dto/update-precio.dto");
const update_producto_dto_1 = require("../../dto/update-producto.dto");
const producto_mapper_1 = require("../../mappers/producto.mapper");
let ProductoPersistenceAdapter = ProductoPersistenceAdapter_1 = class ProductoPersistenceAdapter {
    constructor(repository, dataSource, uow) {
        this.repository = repository;
        this.dataSource = dataSource;
        this.uow = uow;
        this.logger = new common_1.Logger(ProductoPersistenceAdapter_1.name);
        this.ENTITY_NAME = 'Producto';
    }
    async create(data, linea, marca, usuario) {
        const repo = this.uow.getRepository(producto_entity_1.Producto);
        this.logger.log(`Creando un nuevo p ${this.ENTITY_NAME}`);
        try {
            this.logger.debug('Data recibida:', JSON.stringify(data, null, 2));
            this.logger.debug('Linea:', linea);
            this.logger.debug('Marca:', marca);
            this.logger.debug('Usuario:', usuario);
            const nuevaEntity = repo.create({
                ...data,
                linea,
                marca,
                usuarioCreated: usuario,
            });
            this.logger.debug('Entity creada:', nuevaEntity);
            const entityGuardada = await repo.save(nuevaEntity);
            this.logger.log(`Entity guardada con ID: ${entityGuardada.id}`);
            this.logger.log(`${this.ENTITY_NAME} creado exitosamente con ID: ${entityGuardada.id}`);
            return entityGuardada;
        }
        catch (error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}:`, error);
            this.logger.error('Stack trace:', error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
    }
    async findOne(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('producto')
                .leftJoinAndSelect('producto.linea', 'linea')
                .leftJoinAndSelect('producto.marca', 'marca')
                .where('producto.id = :id', { id })
                .andWhere('producto.deletedAt IS NULL')
                .getOne();
            this.logger.warn(`rrr: ${entity}.`);
            if (!entity) {
                throw new entity_notFound_exceptions_1.EntityNotFoundException('Entidad no encontrada.');
            }
            return entity;
        }
        catch (error) {
            if (error instanceof entity_notFound_exceptions_1.EntityNotFoundException) {
                throw error;
            }
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findByIdConAuditoria(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('producto')
                .leftJoinAndSelect('producto.usuarioCreated', 'usuarioCreated')
                .leftJoinAndSelect('producto.usuarioUpdated', 'usuarioUpdated')
                .leftJoinAndSelect('producto.usuarioDeleted', 'usuarioDeleted')
                .where('producto.id = :id', { id })
                .getOne();
            this.logger.warn(`: ${entity}.`);
            if (!entity) {
                throw new entity_notFound_exceptions_1.EntityNotFoundException('Entidad no encontrada.');
            }
            return entity;
        }
        catch (error) {
            if (error instanceof entity_notFound_exceptions_1.EntityNotFoundException) {
                throw error;
            }
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findByIdWithoutRelations(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('producto')
                .where('producto.id = :id', { id })
                .andWhere('producto.deletedAt IS NULL')
                .getOne();
            if (!entity) {
                throw new entity_notFound_exceptions_1.EntityNotFoundException('Entidad no encontrada.');
            }
            return entity;
        }
        catch (error) {
            if (error instanceof entity_notFound_exceptions_1.EntityNotFoundException) {
                throw error;
            }
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async update(id, data, linea, marca, usuario) {
        const repo = this.uow.getRepository(producto_entity_1.Producto);
        try {
            const entity = await this.findOne(id);
            if (!entity) {
                throw new common_1.NotFoundException(`EL prodcuto con ID ${id} no encontrada`);
            }
            const { ...dataSinItems } = data;
            Object.assign(entity, dataSinItems, {
                linea,
                marca,
            });
            entity.usuarioUpdated = usuario;
            const entityActualizada = await repo.save(entity);
            return entityActualizada;
        }
        catch (error) {
            this.logger.warn(`Items para eliminar: )}`);
            throw new database_connection_exception_1.DatabaseConnectionException(error);
        }
    }
    async updateEntity(uow, producto) {
        const repo = uow.getRepository(producto_entity_1.Producto);
        return await repo.save(producto);
    }
    async remove(entity, usuario) {
        if (entity.deletedAt) {
            throw new common_1.NotFoundException('Entidad  ya eliminada.');
        }
        try {
            entity.deletedAt = new Date();
            entity.usuarioDeleted = usuario;
            return await this.repository.save(entity);
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
    }
    async findBy(denominacion, codigoProveedor, codProveedorExacto, codigoReferencia, marca_id, linea_id, proveedor_id, conStock, skip, take) {
        this.logger.warn(`llega`);
        const query = this.repository
            .createQueryBuilder('producto')
            .leftJoinAndSelect('producto.marca', 'marca')
            .leftJoinAndSelect('producto.linea', 'linea');
        if (denominacion || codigoProveedor || codigoReferencia) {
            const condiciones = [];
            const parametros = {};
            if (denominacion) {
                condiciones.push(`UPPER(producto.denominacion) LIKE UPPER(:denominacion)`);
                parametros.denominacion = `%${denominacion}%`;
            }
            if (codigoProveedor) {
                if (codProveedorExacto) {
                    condiciones.push(`UPPER(producto.codigoProveedor) = UPPER(:codigoProveedor)`);
                    parametros.codigoProveedor = codigoProveedor;
                }
                else {
                    condiciones.push(`UPPER(producto.codigoProveedor) LIKE UPPER(:codigoProveedor)`);
                    parametros.codigoProveedor = `%${codigoProveedor}%`;
                }
            }
            if (codigoReferencia) {
                condiciones.push(`UPPER(producto.codigoReferencia) LIKE UPPER(:codigoReferencia)`);
                parametros.codigoReferencia = `%${codigoReferencia}%`;
            }
            query.andWhere(`(${condiciones.join(' OR ')})`, parametros);
        }
        if (marca_id) {
            query.andWhere('marca.id = :marca_id', { marca_id });
        }
        if (linea_id) {
            query.andWhere('linea.id = :linea_id', { linea_id });
        }
        this.logger.warn(`conStock llega como: ${conStock} (${typeof conStock})`);
        if (conStock) {
            query.andWhere('producto.stock > 0');
        }
        query.andWhere('producto.deletedAt IS NULL');
        query.orderBy('producto.denominacion', 'ASC');
        query.skip(skip).take(take);
        const [data, total] = await query.getManyAndCount();
        this.logger.warn(`conStock llega como 1: ${data}`);
        return {
            data,
            total,
        };
    }
    async findByRapido(codigo, exacto, skip, take) {
        this.logger.warn(`llega`);
        const query = this.repository
            .createQueryBuilder('producto')
            .leftJoinAndSelect('producto.marca', 'marca')
            .leftJoinAndSelect('producto.linea', 'linea')
            .leftJoinAndSelect('producto.proveedor', 'proveedor')
            .where('producto.deletedAt IS NULL');
        if (codigo) {
            if (exacto) {
                query.andWhere('(producto.codigoProveedor = :codigo OR producto.codigoReferencia = :codigo)', { codigo });
            }
            else {
                query.andWhere(`(
        producto.codigoProveedor LIKE :codigo OR 
        producto.codigoReferencia LIKE :codigo OR 
        producto.denominacion LIKE :codigo
      )`, { codigo: `%${codigo}%` });
            }
        }
        query.orderBy('producto.denominacion', 'ASC');
        query.skip(skip).take(take);
        const [data, total] = await query.getManyAndCount();
        this.logger.warn(`Resultados: ${data.length} encontrados`);
        return { data, total };
    }
    async isCodigoProveedorDuplicado(codigoProveedor, id) {
        if (!codigoProveedor ||
            codigoProveedor.trim() === '' ||
            codigoProveedor === '0') {
            return false;
        }
        const query = this.repository
            .createQueryBuilder('producto')
            .where('producto.codigoProveedor = :codigoProveedor', {
            codigoProveedor,
        });
        if (id) {
            query.andWhere('producto.id != :id', { id });
        }
        const existe = await query.getExists();
        return existe;
    }
    async actualizarPrecio(id, dto, usuario) {
        const repo = this.uow.getRepository(producto_entity_1.Producto);
        const entity = await repo.findOne({ where: { id } });
        if (!entity) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        producto_mapper_1.ProductoMapper.mapPrecios(entity, dto, usuario);
        await repo.save(entity);
    }
    async findByDenominacion(denominacion) {
        try {
            const entity = await this.repository.findOne({
                where: { denominacion, deletedAt: (0, typeorm_2.IsNull)() },
            });
            return entity;
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async existsByDenominacion(denominacion, excludeId) {
        try {
            const queryBuilder = this.repository
                .createQueryBuilder('producto')
                .where('producto.denominacion = :denominacion', { denominacion })
                .andWhere('producto.deletedAt IS NULL');
            if (excludeId) {
                queryBuilder.andWhere('producto.id != :excludeId', { excludeId });
            }
            const count = await queryBuilder.getCount();
            return count > 0;
        }
        catch (error) {
            this.logger.error(`Error verificando existencia de denominación:}`);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findByDenominacionCodigoProveedorFiltered(denominacion, skip = 0, take = 10) {
        try {
            const query = this.repository
                .createQueryBuilder('producto')
                .leftJoinAndSelect('producto.marca', 'marca')
                .leftJoinAndSelect('producto.linea', 'linea');
            query.andWhere('producto.deletedAt IS NULL');
            query.orderBy('producto.denominacion', 'ASC');
            query.skip(skip).take(take);
            const [data, total] = await query.getManyAndCount();
            return { data, total };
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async existsProductosActivosByMarca(marcaId) {
        const count = await this.repository
            .createQueryBuilder('producto')
            .where('producto.marca_id = :marcaId', { marcaId })
            .andWhere('producto.deletedAt IS NULL')
            .limit(1)
            .getCount();
        return count > 0;
    }
    async existsProductosActivosByLinea(lineaId) {
        const count = await this.repository
            .createQueryBuilder('producto')
            .where('producto.linea_id = :lineaId', { lineaId })
            .andWhere('producto.deletedAt IS NULL')
            .limit(1)
            .getCount();
        return count > 0;
    }
    async findByIds(ids) {
        const uniqueIds = [...new Set(ids)];
        if (uniqueIds.length === 0) {
            return [];
        }
        return await this.repository
            .createQueryBuilder('producto')
            .where('producto.id IN (:...ids)', { ids: uniqueIds })
            .getMany();
    }
    async existsByCodigoProveedor(codigoProveedor, excludeId) {
        try {
            const queryBuilder = this.repository
                .createQueryBuilder('producto')
                .where('producto.codigoProveedor = :codigoProveedor', { codigoProveedor })
                .andWhere('producto.deletedAt IS NULL');
            if (excludeId) {
                queryBuilder.andWhere('producto.id != :excludeId', { excludeId });
            }
            const count = await queryBuilder.getCount();
            return count > 0;
        }
        catch (error) {
            this.logger.error(`Error verificando existencia de denominación:}`);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
};
exports.ProductoPersistenceAdapter = ProductoPersistenceAdapter;
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_producto_dto_1.CreateProductoDto,
        linea_entity_1.Linea,
        marca_entity_1.Marca,
        usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], ProductoPersistenceAdapter.prototype, "create", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_producto_dto_1.UpdateProductoDto,
        linea_entity_1.Linea,
        marca_entity_1.Marca,
        usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], ProductoPersistenceAdapter.prototype, "update", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_precio_dto_1.UpdatePrecioDto, usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], ProductoPersistenceAdapter.prototype, "actualizarPrecio", null);
exports.ProductoPersistenceAdapter = ProductoPersistenceAdapter = ProductoPersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __param(2, (0, common_1.Inject)('UnitOfWork')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource, Object])
], ProductoPersistenceAdapter);
//# sourceMappingURL=producto.persistence-adapters.js.map
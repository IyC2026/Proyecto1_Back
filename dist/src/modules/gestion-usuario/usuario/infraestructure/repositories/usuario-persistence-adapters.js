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
var UsuarioPersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("../../domain/entities/usuario.entity");
const rol_entity_1 = require("../../../rol/domain/entities/rol.entity");
const bcrypt = require("bcrypt");
const usuario_policy_1 = require("./usuario-policy");
let UsuarioPersistenceAdapter = UsuarioPersistenceAdapter_1 = class UsuarioPersistenceAdapter {
    constructor(repository, dataSource) {
        this.repository = repository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(UsuarioPersistenceAdapter_1.name);
        this.ENTITY_NAME = 'Usuario';
    }
    async createUsuarioFor(personal, uow) {
        const usuarioRepo = uow.getRepository(usuario_entity_1.Usuario);
        const rolRepo = uow.getRepository(rol_entity_1.Rol);
        const contrasenaHasheada = await bcrypt.hash('12345678', 10);
        const rolId = personal.esVendedor ? 4 : 2;
        const rol = await rolRepo.findOne({
            where: { id: rolId },
        });
        if (!rol) {
            throw new Error(`No existe el rol con id ${rolId}`);
        }
        const usuario = usuarioRepo.create({
            mail: personal.mail,
            denominacion: personal.denominacion,
            contrasena: contrasenaHasheada,
            personal: personal,
            personalId: personal.id,
            roles: [rol],
            activo: true,
        });
        return await usuarioRepo.save(usuario);
    }
    async findBy(denominacion, skip = 0, take = 10) {
        try {
            const query = this.repository
                .createQueryBuilder('usuario')
                .where('usuario.deletedAt IS NULL');
            query.andWhere('UPPER(usuario.denominacion) LIKE UPPER(:denominacion)', {
                denominacion: `%${denominacion}%`,
            });
            usuario_policy_1.UsuarioPolicy.excluirUsuariosSistema(query);
            const [data, total] = await query
                .orderBy('usuario.denominacion', 'ASC')
                .skip(skip)
                .take(take)
                .getManyAndCount();
            return { data, total };
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async update(id, data, rol) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const entity = await queryRunner.manager.findOne(usuario_entity_1.Usuario, {
                where: { id },
                relations: ['rol'],
            });
            if (!entity) {
                throw new common_1.NotFoundException(`Línea con ID ${id} no encontrada`);
            }
            Object.assign(entity, data, { rol });
            const entityActualizada = await queryRunner.manager.save(entity);
            await queryRunner.commitTransaction();
            return entityActualizada;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
        finally {
            await queryRunner.release();
        }
    }
    async create(data, rol) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const nuevaData = queryRunner.manager.create(usuario_entity_1.Usuario, {
                ...data,
                rol,
            });
            const dataGuardada = await queryRunner.manager.save(nuevaData);
            await queryRunner.commitTransaction();
            return dataGuardada;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Error al conectar con la base de datos: ${error.message}`);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        const entity = await this.findOne(id);
        if (!entity) {
            throw new Error(`${this.ENTITY_NAME}  con ID ${id} no encontrada`);
        }
        if (!entity || entity.deletedAt) {
            throw new common_1.NotFoundException('Entidad no encontrada o ya eliminada.');
        }
        try {
            await this.repository.update(id, { deletedAt: new Date() });
            return entity;
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
    }
    async save(usuario) {
        try {
            return await this.repository.save(usuario);
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
    }
    async findOne2(id) {
        try {
            return await this.repository.findOne({
                where: { id, deletedAt: (0, typeorm_2.IsNull)() },
            });
        }
        catch {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findOne(id) {
        try {
            return await this.repository.findOne({
                where: { id, deletedAt: (0, typeorm_2.IsNull)() },
                relations: ['roles'],
            });
        }
        catch {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findAll(skip = 0, take = 10) {
        try {
            return await this.repository.find({
                where: { deletedAt: (0, typeorm_2.IsNull)() },
                relations: ['roles'],
                skip,
                take,
            });
        }
        catch {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findOneWithRoles(id) {
        return this.repository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['roles'],
        });
    }
    async findByMailFiltered(mail, skip = 0, take = 10) {
        try {
            return await this.repository.find({
                where: { mail, deletedAt: (0, typeorm_2.IsNull)() },
                skip,
                take,
                order: { mail: 'ASC' },
            });
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findByMail(mail) {
        try {
            const entity = await this.repository.findOne({
                where: { mail, deletedAt: (0, typeorm_2.IsNull)() },
                relations: ['roles'],
            });
            return entity;
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async updateContrasena(usuario) {
        return await this.repository.save(usuario);
    }
    async updateDatos(usuario) {
        return await this.repository.save(usuario);
    }
};
exports.UsuarioPersistenceAdapter = UsuarioPersistenceAdapter;
exports.UsuarioPersistenceAdapter = UsuarioPersistenceAdapter = UsuarioPersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UsuarioPersistenceAdapter);
//# sourceMappingURL=usuario-persistence-adapters.js.map
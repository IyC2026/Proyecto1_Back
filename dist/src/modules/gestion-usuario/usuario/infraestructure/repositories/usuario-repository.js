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
var UsuarioRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const common_1 = require("@nestjs/common");
const usuario_persistence_adapters_1 = require("./usuario-persistence-adapters");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
let UsuarioRepository = UsuarioRepository_1 = class UsuarioRepository {
    constructor(persistenceService) {
        this.persistenceService = persistenceService;
        this.logger = new common_1.Logger(UsuarioRepository_1.name);
        this.ENTITY_NAME = 'Usuario';
    }
    async findBy(denominacion, skip = 0, take = 10) {
        this.logger.log(`Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        return this.persistenceService.findBy(denominacion, skip, take);
    }
    async findOne(id) {
        const entity = await this.persistenceService.findOne(id);
        return entity;
    }
    async findByMail(mail) {
        const entity = this.persistenceService.findByMail(mail);
        return entity;
    }
    async update(id, data, rol) {
        return this.persistenceService.update(id, data, rol);
    }
    async findAll(skip = 0, take = 10) {
        return this.persistenceService.findAll(skip, take);
    }
    async create(data, rol) {
        this.logger.log(`Creando un nuevo `);
        try {
            return await this.persistenceService.create(data, rol);
        }
        catch (error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
            throw new database_connection_exception_1.DatabaseConnectionException('No se pudo crear la entidad en la base de datos.');
        }
    }
    async remove(id) {
        const entity = this.persistenceService.remove(id);
        return entity;
    }
    async findByMailFiltered(mail, skip = 0, take = 10) {
        return this.persistenceService.findByMailFiltered(mail, skip, take);
    }
    async save(usuario) {
        try {
            return await this.persistenceService.save(usuario);
        }
        catch (error) {
            this.logger.error(`Error al guardar ${this.ENTITY_NAME}: ${error.message}`);
            throw new database_connection_exception_1.DatabaseConnectionException('No se pudo guardar la entidad en la base de datos.');
        }
    }
    async findOneWithRoles(id) {
        return this.persistenceService.findOneWithRoles(id);
    }
    async updateContrasena(usuario) {
        return this.persistenceService.updateContrasena(usuario);
    }
    async updateDatos(usuario) {
        return this.persistenceService.updateDatos(usuario);
    }
    async createUsuarioFor(personal, uow) {
        return this.persistenceService.createUsuarioFor(personal, uow);
    }
};
exports.UsuarioRepository = UsuarioRepository;
exports.UsuarioRepository = UsuarioRepository = UsuarioRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuario_persistence_adapters_1.UsuarioPersistenceAdapter])
], UsuarioRepository);
//# sourceMappingURL=usuario-repository.js.map
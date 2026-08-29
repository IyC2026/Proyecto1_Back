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
var UsuarioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const rol_service_1 = require("../../../rol/application/services/rol.service");
const usuario_mapper_1 = require("../usuario.mapper");
const paginacion_utils_1 = require("../../../../common/utils/pagination/paginacion-utils");
const bcrypt = require("bcrypt");
let UsuarioService = UsuarioService_1 = class UsuarioService {
    constructor(repository, rolService) {
        this.repository = repository;
        this.rolService = rolService;
        this.logger = new common_1.Logger(UsuarioService_1.name);
        this.ENTITY_NAME = 'Usuario';
    }
    async findOne(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} no encontrado.`);
        return entity;
    }
    async findByMail(mail) {
        const entity = await this.repository.findByMail(mail);
        return entity || null;
    }
    async checkByMail(mail, id) {
        const exists = await this.repository.findByMail(mail);
        if (exists && exists.id !== id) {
            this.logger.warn(`${this.ENTITY_NAME} Conflicto: el mail ya está en uso: ${mail}`);
            throw new common_1.ConflictException('Denominación ya en uso.');
        }
    }
    async findBy(denominacion, skip = 0, take = 10) {
        this.logger.log(`  Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        const result = await this.repository.findBy(denominacion, skip, take);
        const data = result.data.map((marca) => usuario_mapper_1.UsuarioMapper.toDto(marca));
        return {
            data,
            total: paginacion_utils_1.PaginacionUtils.totalItems(result.total),
        };
    }
    async findAll(skip = 0, take = 10) {
        return this.repository.findAll(skip, take);
    }
    async findAll2() {
        const result = await this.repository.findAll(0, 110);
        const data = result.map((linea) => usuario_mapper_1.UsuarioMapper.toDto(linea));
        return {
            data,
            total: 1,
        };
    }
    async updateDatos(id, dto) {
        const usuario = await this.repository.findOne(id);
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        if (dto.mail && dto.mail !== usuario.mail) {
            const mailEnUso = await this.repository.findByMail(dto.mail);
            if (mailEnUso) {
                throw new common_1.ConflictException('El mail ya está en uso por otro usuario');
            }
            usuario.mail = dto.mail;
        }
        if (dto.denominacion) {
            usuario.denominacion = dto.denominacion;
        }
        if (dto.rolesIds !== undefined) {
            if (dto.rolesIds.length === 0) {
                throw new common_1.BadRequestException('El usuario debe tener al menos un rol');
            }
            usuario.roles = await this.rolService.findByIds(dto.rolesIds);
        }
        await this.repository.updateDatos(usuario);
    }
    async create(dto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con mail: ${dto.mail}`);
        await this.checkByMail(dto.mail, 0);
        const rol = await this.rolService.findOne(dto.rolId);
        if (!rol) {
            throw new common_1.NotFoundException(`Rol con ID ${dto.rolId} no encontrada`);
        }
        return this.repository.create(dto, rol);
    }
    async createUsuarioFor(personal, uow) {
        return this.repository.createUsuarioFor(personal, uow);
    }
    async remove(id) {
        const entity = await this.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return this.repository.remove(id);
    }
    async findByMailFiltered(mail, skip = 0, take = 10) {
        return this.repository.findByMailFiltered(mail, skip, take);
    }
    async save(usuario) {
        return this.repository.save(usuario);
    }
    async updateContrasena(id, data) {
        if (data.contrasenaNueva !== data.confirmarContrasena) {
            throw new common_1.BadRequestException('Las contraseñas no coinciden');
        }
        const usuario = await this.repository.findOne(id);
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const contrasenaValida = await bcrypt.compare(data.contrasenaActual, usuario.contrasena);
        if (!contrasenaValida) {
            throw new common_1.UnauthorizedException('La contraseña actual es incorrecta');
        }
        const contrasenaNuevaHasheada = await bcrypt.hash(data.contrasenaNueva, 10);
        usuario.contrasena = contrasenaNuevaHasheada;
        await this.repository.updateContrasena(usuario);
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = UsuarioService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IUsuarioRepository')),
    __metadata("design:paramtypes", [Object, rol_service_1.RolService])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map
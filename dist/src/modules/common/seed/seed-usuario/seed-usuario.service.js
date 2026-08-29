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
exports.SeedUsuarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rol_entity_1 = require("../../../gestion-usuario/rol/domain/entities/rol.entity");
const usuario_entity_1 = require("../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let SeedUsuarioService = class SeedUsuarioService {
    constructor(rolRepository, usuarioRepository) {
        this.rolRepository = rolRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async seedRol() {
        const entryData = [
            { denominacion: 'Administrador' },
            { denominacion: 'Empleado' },
            { denominacion: 'Repositor' },
            { denominacion: 'Vendedor' },
            { denominacion: 'Admin' },
            { denominacion: 'Repartidor' },
            { denominacion: 'Cobrador' },
        ];
        for (const data of entryData) {
            const exists = await this.rolRepository.findOneBy({
                denominacion: data.denominacion
            });
            if (!exists) {
                const dataGuardada = this.rolRepository.create(data);
                await this.rolRepository.save(dataGuardada);
                console.log(`✅ Rol "${data.denominacion}" creado.`);
            }
            else {
                console.log(`⚠️ Rol"${data.denominacion}" ya existe.`);
            }
        }
    }
    async seedUsuario() {
        const entryData = [
            { mail: 'admin@gmail.com', contrasena: 'admin', rol: "Admin", denominacion: "Admin" },
        ];
        for (const data of entryData) {
            const rol = await this.rolRepository.findOneBy({
                denominacion: data.rol
            });
            if (!rol) {
                console.log(`❌ No se encontró el rol "${data.rol}".`);
                continue;
            }
            const exists = await this.usuarioRepository.findOneBy({
                mail: data.mail
            });
            if (exists) {
                console.log(`⚠️ Usuario "${data.mail}" ya existe.`);
                continue;
            }
            const contrasenaHasheada = await bcrypt.hash(data.contrasena, 10);
            const usuario = this.usuarioRepository.create({
                mail: data.mail,
                contrasena: contrasenaHasheada,
                denominacion: data.denominacion,
                roles: [rol],
            });
            await this.usuarioRepository.save(usuario);
            console.log(`✅ Usuario "${data.mail}" creado.`);
        }
    }
    async runAllSeeds() {
        console.log('🚀 Iniciando todos los seeds...');
        await this.seedRol();
        await this.seedUsuario();
        console.log('✅ Todos los seeds completados.');
    }
};
exports.SeedUsuarioService = SeedUsuarioService;
exports.SeedUsuarioService = SeedUsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rol_entity_1.Rol)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SeedUsuarioService);
//# sourceMappingURL=seed-usuario.service.js.map
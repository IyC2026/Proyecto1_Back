"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedUsuarioModule = void 0;
const common_1 = require("@nestjs/common");
const seed_usuario_service_1 = require("./seed-usuario.service");
const seed_usuario_controller_1 = require("./seed-usuario.controller");
const typeorm_1 = require("@nestjs/typeorm");
const rol_entity_1 = require("../../../gestion-usuario/rol/domain/entities/rol.entity");
const usuario_entity_1 = require("../../../gestion-usuario/usuario/domain/entities/usuario.entity");
let SeedUsuarioModule = class SeedUsuarioModule {
};
exports.SeedUsuarioModule = SeedUsuarioModule;
exports.SeedUsuarioModule = SeedUsuarioModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([rol_entity_1.Rol,
                usuario_entity_1.Usuario,]),
        ],
        controllers: [seed_usuario_controller_1.SeedUsuarioController],
        providers: [seed_usuario_service_1.SeedUsuarioService],
        exports: [seed_usuario_service_1.SeedUsuarioService],
    })
], SeedUsuarioModule);
//# sourceMappingURL=seed-usuario.module.js.map
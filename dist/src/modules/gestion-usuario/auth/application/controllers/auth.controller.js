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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const register_dto_1 = require("../../dto/register.dto");
const login_dto_1 = require("../../dto/login.dto");
const cambiar_contrasena_dto_1 = require("../../dto/cambiar-contrasena.dto");
const recuperar_contrasena_dto_1 = require("../../dto/recuperar-contrasena.dto");
const verificar_codigo_dto_1 = require("../../dto/verificar-codigo.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(registrarUsuarioDto) {
        return this.authService.registrarUsuario(registrarUsuarioDto);
    }
    async login(loginDto) {
        const resultado = await this.authService.login(loginDto);
        if (!resultado) {
            throw new common_1.BadRequestException('Credenciales incorrectas');
        }
        return resultado;
    }
    async loginConGoogle(body) {
        console.log(' Proceso de login con Google iniciado', body);
        return this.authService.loginConGoogle(body.token, body.empresaId);
    }
    async recuperarPassword(dto) {
        return this.authService.enviarCodigoRecuperacion(dto);
    }
    async verificarCodigo(dto) {
        return this.authService.verificarCodigo(dto);
    }
    async cambiarContrasena(dto) {
        return this.authService.cambiarContrasena(dto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('registrar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegistrarUsuarioDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('login-con-google'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginConGoogle", null);
__decorate([
    (0, common_1.Post)('recuperar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recuperar_contrasena_dto_1.RecuperarPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "recuperarPassword", null);
__decorate([
    (0, common_1.Post)('verificar-codigo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verificar_codigo_dto_1.VerificarCodigoDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verificarCodigo", null);
__decorate([
    (0, common_1.Patch)('cambiar-contrasena'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cambiar_contrasena_dto_1.CambiarContrasenaDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "cambiarContrasena", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthGuard = class AuthGuard {
    constructor(jwtService, reflector, configService, usuarioRepository) {
        this.jwtService = jwtService;
        this.reflector = reflector;
        this.configService = configService;
        this.usuarioRepository = usuarioRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const requiredRoles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles)
            return true;
        const authorizationHeader = request.headers['authorization'];
        if (!authorizationHeader) {
            throw new common_1.UnauthorizedException('Token no encontrado');
        }
        const token = authorizationHeader.split(' ')[1];
        try {
            const secret = this.configService.get('JWT_SECRET');
            const payload = this.jwtService.verify(token, { secret });
            const usuario = await this.usuarioRepository.findOneWithRoles(payload.sub);
            if (!usuario) {
                throw new common_1.UnauthorizedException('Usuario no existe');
            }
            request['user'] = usuario;
            const userRoles = usuario.roles.map((r) => r.denominacion);
            console.log('Handler:', context.getHandler().name);
            console.log('Class:', context.getClass().name);
            console.log('requiredRoles:', requiredRoles);
            const tieneRol = userRoles.some((role) => requiredRoles.includes(role));
            if (!tieneRol) {
                throw new common_1.ForbiddenException('No tienes permisos');
            }
            return true;
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException ||
                error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)('IUsuarioRepository')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector,
        config_1.ConfigService, Object])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map
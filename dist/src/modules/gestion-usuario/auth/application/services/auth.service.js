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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const usuario_service_1 = require("../../../usuario/application/services/usuario.service");
const google_auth_library_1 = require("google-auth-library");
const nodemailer = require("nodemailer");
let AuthService = class AuthService {
    constructor(jwtService, usuarioService, configService) {
        this.jwtService = jwtService;
        this.usuarioService = usuarioService;
        this.configService = configService;
    }
    async registrarUsuario(registrarUsuarioDto) {
        const { mail, contrasena, rolId, denominacion } = registrarUsuarioDto;
        const contrasenaHasheada = await bcrypt.hash(contrasena, 10);
        registrarUsuarioDto.contrasena = contrasenaHasheada;
        const usuario = this.usuarioService.create(registrarUsuarioDto);
        return usuario;
    }
    async login(loginDto) {
        const { mail, contrasena, empresaId } = loginDto;
        const usuario = await this.usuarioService.findByMail(mail);
        if (!usuario) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const contrasenaValidada = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!contrasenaValidada) {
            throw new common_1.UnauthorizedException('Contraseña incorrecta');
        }
        const accessTokenExp = this.configService.get('JWT_EXPIRATION_ACCESS', '60s');
        const refreshTokenExp = this.configService.get('JWT_EXPIRATION_REFRESH', '7d');
        const payload = {
            sub: usuario.id,
            personalId: usuario.personalId,
            roles: usuario.roles.map((r) => r.id),
            empresaId: empresaId,
            puntoVentaId: process.env.PUNTO_VENTA_ACTIVO_ID,
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: accessTokenExp,
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: refreshTokenExp,
        });
        return {
            accessToken,
            refreshToken,
            usuario,
        };
    }
    async loginConGoogle(token, empresaId) {
        const clientId = this.configService.get('GOOGLE_CLIENT_ID');
        console.log('🔵 GOOGLE_CLIENT_ID:', clientId);
        const client = new google_auth_library_1.OAuth2Client(clientId);
        console.log('🔵 CLIENTE:', client);
        let email;
        let name;
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: clientId,
            });
            const payload = ticket.getPayload();
            email = payload?.email;
            name = payload?.name;
            console.log('🟢 Payload de Google:', payload);
        }
        catch (error) {
            console.error('🔴 Error al verificar el token de Google:', error);
            throw new common_1.UnauthorizedException('Token de Google inválido o expirado');
        }
        let usuario = await this.usuarioService.findByMail(email);
        console.log('🟢 Usuario encontrado:', usuario);
        if (!usuario) {
            console.log('🟠 Usuario no existe, se va a crear uno nuevo');
            const registrarUsuarioDto = {
                mail: email,
                contrasena: Math.random().toString(36).slice(-10),
                rolId: 2,
                denominacion: name,
            };
            console.log('🟠 Registrar Usuario DTO:', registrarUsuarioDto);
            usuario = await this.registrarUsuario(registrarUsuarioDto);
        }
        const payloadJwt = {
            id: usuario?.id,
            rolId: 1,
            empresaId: empresaId,
            puntoVentaId: process.env.PUNTO_VENTA_ACTIVO_ID,
        };
        const accessTokenExp = this.configService.get('JWT_EXPIRATION_ACCESS', '60s');
        const refreshTokenExp = this.configService.get('JWT_EXPIRATION_REFRESH', '7d');
        const accessToken = this.jwtService.sign(payloadJwt, {
            expiresIn: accessTokenExp,
        });
        const refreshToken = this.jwtService.sign(payloadJwt, {
            expiresIn: refreshTokenExp,
        });
        return {
            accessToken,
            refreshToken,
            usuario,
        };
    }
    async enviarCodigoRecuperacion(dto) {
        const { mail } = dto;
        const usuario = await this.usuarioService.findByMail(mail);
        if (!usuario) {
            throw new common_1.UnauthorizedException('El correo no está registrado');
        }
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        usuario.codigoRecuperacion = codigo;
        usuario.codigoExpira = new Date(Date.now() + 10 * 60 * 1000);
        await this.usuarioService.save(usuario);
        await this.enviarCorreoRecuperacion(usuario.mail, codigo);
        return { mensaje: 'Se ha enviado un código de verificación al correo' };
    }
    async enviarCorreoRecuperacion(destinatario, codigo) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: this.configService.get('EMAIL_USER'),
                    pass: this.configService.get('EMAIL_PASS'),
                },
            });
            console.log(this.configService.get('EMAIL_USER'));
            console.log(this.configService.get('EMAIL_PASS'));
            console.log('Enviando correo a:', destinatario);
            const info = await transporter.sendMail({
                from: `"Sistema de Recuperación" <${this.configService.get('EMAIL_USER')}>`,
                to: destinatario,
                subject: 'Código de recuperación de contraseña',
                text: `Tu código de recuperación es: ${codigo}`,
                html: `<p>Tu código de recuperación es: <strong>${codigo}</strong></p>`,
            });
            console.log('Correo enviado:', info.messageId);
        }
        catch (error) {
            console.error('Error al enviar el correo:', error);
            throw new Error('No se pudo enviar el correo de recuperación');
        }
    }
    async verificarCodigo(dto) {
        const { mail, codigo } = dto;
        const usuario = await this.usuarioService.findByMail(mail);
        if (!usuario ||
            usuario.codigoRecuperacion !== codigo ||
            usuario.codigoExpira < new Date()) {
            throw new common_1.BadRequestException('Código inválido o expirado');
        }
        return true;
    }
    async cambiarContrasena(dto) {
        const { mail, nuevaContrasena } = dto;
        try {
            const usuario = await this.usuarioService.findByMail(mail);
            if (!usuario) {
                throw new common_1.BadRequestException('Usuario no encontrado');
            }
            const hash = await bcrypt.hash(nuevaContrasena, 10);
            usuario.contrasena = hash;
            await this.usuarioService.save(usuario);
            return 'Contraseña actualizada correctamente.';
        }
        catch (error) {
            console.error('Error al cambiar contraseña:', error);
            throw new common_1.InternalServerErrorException('Error interno al cambiar contraseña');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        usuario_service_1.UsuarioService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
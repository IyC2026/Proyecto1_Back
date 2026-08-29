"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let GlobalExceptionFilter = GlobalExceptionFilter_1 = class GlobalExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(GlobalExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        this.logger.error('═══════════════════════════════════════════════════════');
        this.logger.error('🚨 ERROR CAPTURADO POR GLOBAL EXCEPTION FILTER 🚨');
        this.logger.error('═══════════════════════════════════════════════════════');
        this.logger.error(`📍 URL: ${request.url}`);
        this.logger.error(`📍 Method: ${request.method}`);
        this.logger.error(`📍 Status Code: ${status}`);
        this.logger.error(`📍 Timestamp: ${new Date().toISOString()}`);
        this.logger.error('───────────────────────────────────────────────────────');
        this.logger.error(`🔴 Tipo de Excepción: ${exception?.constructor?.name || 'Unknown'}`);
        this.logger.error(`🔴 Mensaje: ${exception?.message || 'Sin mensaje'}`);
        this.logger.error('───────────────────────────────────────────────────────');
        if (exception?.stack) {
            this.logger.error('📚 STACK TRACE COMPLETO:');
            this.logger.error(exception.stack);
            this.logger.error('───────────────────────────────────────────────────────');
        }
        else {
            this.logger.error('⚠️ No hay stack trace disponible');
        }
        try {
            const errorDetails = JSON.stringify(exception, Object.getOwnPropertyNames(exception), 2);
            this.logger.error('📋 DETALLES COMPLETOS DEL ERROR:');
            this.logger.error(errorDetails);
            this.logger.error('───────────────────────────────────────────────────────');
        }
        catch (e) {
            this.logger.error('⚠️ No se pudo serializar la excepción completa');
        }
        if (exception?.response) {
            this.logger.error('📨 RESPONSE DEL ERROR:');
            try {
                this.logger.error(JSON.stringify(exception.response, null, 2));
            }
            catch (e) {
                this.logger.error(exception.response);
            }
            this.logger.error('───────────────────────────────────────────────────────');
        }
        if (exception instanceof common_1.HttpException) {
            const exceptionResponse = exception.getResponse();
            this.logger.error('🔍 HTTP EXCEPTION RESPONSE:');
            this.logger.error(JSON.stringify(exceptionResponse, null, 2));
            this.logger.error('───────────────────────────────────────────────────────');
        }
        this.logger.error('═══════════════════════════════════════════════════════');
        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception?.message || 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && {
                stack: exception?.stack,
                details: exception?.response
            })
        };
        response.status(status).json(errorResponse);
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = GlobalExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filters.js.map
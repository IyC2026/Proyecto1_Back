"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionException = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
class DatabaseConnectionException extends common_1.HttpException {
    constructor(error) {
        let message = 'Error inesperado en la base de datos.';
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const errorMessage = typeof error === 'string'
            ? error
            : error?.message ?? '';
        if (error instanceof typeorm_1.QueryFailedError) {
            const sqlErrorCode = error.code;
            if (process.env.DB_TYPE === 'mysql') {
                switch (sqlErrorCode) {
                    case 'ER_DUP_ENTRY':
                        message = 'Error: El valor ingresado ya existe y debe ser único.';
                        status = common_1.HttpStatus.CONFLICT;
                        break;
                    default:
                        message = `Error en MySQL: ${errorMessage}`;
                }
            }
            else if (process.env.DB_TYPE === 'postgres') {
                switch (sqlErrorCode) {
                    case '23505':
                        message = 'Error: El valor ingresado ya existe y debe ser único.';
                        status = common_1.HttpStatus.CONFLICT;
                        break;
                    default:
                        message = `Error en PostgreSQL: ${errorMessage}`;
                }
            }
        }
        else if (errorMessage.includes('ECONNREFUSED')) {
            message = 'Error: No se pudo conectar con la base de datos.';
        }
        super(message, status);
        this.logger = new common_1.Logger(DatabaseConnectionException.name);
    }
}
exports.DatabaseConnectionException = DatabaseConnectionException;
//# sourceMappingURL=database-connection.exception.js.map
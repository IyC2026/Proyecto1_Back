"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDatabaseError = handleDatabaseError;
exports.handleDatabaseErrorOld = handleDatabaseErrorOld;
const common_1 = require("@nestjs/common");
const entity_notFound_exceptions_1 = require("../exceptions/entity-notFound-exceptions");
const typeorm_1 = require("typeorm");
const database_connection_exception_1 = require("../exceptions/database-connection.exception");
const DOMAIN_EXCEPTIONS = [
    entity_notFound_exceptions_1.EntityNotFoundException,
    common_1.HttpException,
];
function handleDatabaseError(logger, methodName, error, options) {
    for (const ExceptionClass of DOMAIN_EXCEPTIONS) {
        if (error instanceof ExceptionClass)
            throw error;
    }
    const err = error instanceof Error ? error : new Error(String(error));
    const prefix = options?.context
        ? `[${methodName}][${options.context}]`
        : `[${methodName}]`;
    logger.error(`${prefix} ${err.message}`, err.stack);
    if (error instanceof typeorm_1.QueryFailedError) {
        const q = error;
        logger.error(`${prefix} QueryFailedError:`, JSON.stringify({ code: q.code, sqlMessage: q.sqlMessage, sql: q.sql,
            parameters: q.parameters, driverError: q.driverError }, null, 2));
        throw new database_connection_exception_1.DatabaseConnectionException(`Error en operación de base de datos: ${err.message}`);
    }
    else if (error instanceof typeorm_1.EntityNotFoundError) {
        logger.error(`${prefix} EntityNotFoundError: ${err.message}`);
        if (options?.rethrowNotFound)
            throw new common_1.NotFoundException(err.message);
        throw new database_connection_exception_1.DatabaseConnectionException(err.message);
    }
    else if (error instanceof typeorm_1.TypeORMError) {
        logger.error(`${prefix} TypeORMError: ${err.message}`, err.stack);
        throw new database_connection_exception_1.DatabaseConnectionException(err.message);
    }
    else {
        logger.error(`${prefix} Error inesperado:`, JSON.stringify({ name: err.name, message: err.message, stack: err.stack }, null, 2));
        throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
    }
}
function handleDatabaseErrorOld(logger, methodName, error) {
    for (const ExceptionClass of DOMAIN_EXCEPTIONS) {
        if (error instanceof ExceptionClass)
            throw error;
    }
    const err = error instanceof Error ? error : new Error(String(error));
    const dbError = error;
    logger.error(`[${methodName}] ${err.message}`, err.stack);
    if (error instanceof typeorm_1.QueryFailedError) {
        logger.error(`[${methodName}] QueryFailedError:`, JSON.stringify({
            message: dbError.message,
            code: dbError.code,
            sqlMessage: dbError.sqlMessage,
            sql: dbError.sql,
            parameters: dbError.parameters,
            driverError: dbError.driverError,
        }, null, 2));
    }
    else if (error instanceof typeorm_1.EntityNotFoundError) {
        logger.error(`[${methodName}] EntityNotFoundError: ${err.message}`);
    }
    else if (error instanceof typeorm_1.TypeORMError) {
        logger.error(`[${methodName}] TypeORMError: ${err.message}`, err.stack);
    }
    else {
        logger.error(`[${methodName}] Error inesperado:`, JSON.stringify({
            name: err.name,
            message: err.message,
            stack: err.stack,
        }, null, 2));
    }
    throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
}
//# sourceMappingURL=database-error.helper.js.map
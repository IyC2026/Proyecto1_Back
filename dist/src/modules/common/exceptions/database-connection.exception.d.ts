import { HttpException } from '@nestjs/common';
export declare class DatabaseConnectionException extends HttpException {
    private readonly logger;
    constructor(error: any);
}

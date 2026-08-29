import { HttpException } from '@nestjs/common';
export declare class EntityConflictException extends HttpException {
    constructor(entityName: string);
}

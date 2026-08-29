import { SelectQueryBuilder, ObjectLiteral } from 'typeorm';
export declare class QueryBuilderHelper {
    static applyDeletedFilter<T extends ObjectLiteral>(query: SelectQueryBuilder<T>, incluirEliminados: boolean): SelectQueryBuilder<T>;
    static applyPagination<T extends ObjectLiteral>(query: SelectQueryBuilder<T>, skip?: number, take?: number): SelectQueryBuilder<T>;
    static applyOrder<T extends ObjectLiteral>(query: SelectQueryBuilder<T>, alias: string, campo: string, orden?: 'ASC' | 'DESC'): SelectQueryBuilder<T>;
}

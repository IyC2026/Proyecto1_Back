import { SelectQueryBuilder } from 'typeorm';
export declare class ClienteQueryHelper {
    static joinCliente(qb: SelectQueryBuilder<any>, alias?: string): SelectQueryBuilder<any>;
}

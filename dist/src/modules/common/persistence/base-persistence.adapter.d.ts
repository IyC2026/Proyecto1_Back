import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
export declare abstract class BasePersistenceAdapter<T extends ObjectLiteral> {
    protected abstract readonly ALIAS: string;
    protected readonly repository: Repository<T>;
    protected constructor(repository: Repository<T>);
    protected baseQuery(incluirEliminados?: boolean): SelectQueryBuilder<T>;
    protected baseQueryWithDeleted(): SelectQueryBuilder<T>;
}

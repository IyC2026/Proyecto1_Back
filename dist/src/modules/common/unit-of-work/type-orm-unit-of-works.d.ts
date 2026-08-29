import { DataSource, EntityManager, EntityTarget, Repository, ObjectLiteral } from "typeorm";
import { IUnitOfWork } from "./iunit-of-work.";
export declare class TypeOrmUnitOfWork implements IUnitOfWork {
    private dataSource;
    private queryRunner;
    constructor(dataSource: DataSource);
    start(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    release(): Promise<void>;
    getManager(): EntityManager;
    getRepository<T extends ObjectLiteral>(repo: EntityTarget<T>): Repository<T>;
}

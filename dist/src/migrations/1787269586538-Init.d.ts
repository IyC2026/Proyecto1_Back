import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Init1787269586538 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

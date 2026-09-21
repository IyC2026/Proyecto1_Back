import { MigrationInterface, QueryRunner } from "typeorm";

export class CatalogoSuperLineaPresentacion1790027463977 implements MigrationInterface {
    name = 'CatalogoSuperLineaPresentacion1790027463977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`super_linea\` (\`id\` int NOT NULL AUTO_INCREMENT, \`denominacion\` varchar(255) NOT NULL, \`observacion\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`usuarioCreatedId\` int NULL, \`usuarioUpdatedId\` int NULL, \`usuarioDeletedId\` int NULL, \`sistema\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_9e4184946b687e188250ddefea\` (\`denominacion\`, \`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`presentacion\` (\`id\` int NOT NULL AUTO_INCREMENT, \`denominacion\` varchar(255) NOT NULL, \`observacion\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`usuarioCreatedId\` int NULL, \`usuarioUpdatedId\` int NULL, \`usuarioDeletedId\` int NULL, \`sistema\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_16507f51a2d2e59f7e5e4d5e79\` (\`denominacion\`, \`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`linea\` ADD \`superLineaId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`linea\` ADD \`super_linea_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`producto\` ADD \`presentacionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`producto\` ADD \`denominacionPersonalizada\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`producto\` ADD \`presentacion_id\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_c92ad68fd9cef3017f0ba7d115\` ON \`linea\` (\`super_linea_id\`)`);
        await queryRunner.query(`ALTER TABLE \`linea\` ADD CONSTRAINT \`FK_c92ad68fd9cef3017f0ba7d1155\` FOREIGN KEY (\`super_linea_id\`) REFERENCES \`super_linea\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`producto\` ADD CONSTRAINT \`FK_7282b775a6cd16a48f96f242d91\` FOREIGN KEY (\`presentacion_id\`) REFERENCES \`presentacion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`producto\` DROP FOREIGN KEY \`FK_7282b775a6cd16a48f96f242d91\``);
        await queryRunner.query(`ALTER TABLE \`linea\` DROP FOREIGN KEY \`FK_c92ad68fd9cef3017f0ba7d1155\``);
        await queryRunner.query(`DROP INDEX \`IDX_c92ad68fd9cef3017f0ba7d115\` ON \`linea\``);
        await queryRunner.query(`ALTER TABLE \`producto\` DROP COLUMN \`presentacion_id\``);
        await queryRunner.query(`ALTER TABLE \`producto\` DROP COLUMN \`denominacionPersonalizada\``);
        await queryRunner.query(`ALTER TABLE \`producto\` DROP COLUMN \`presentacionId\``);
        await queryRunner.query(`ALTER TABLE \`linea\` DROP COLUMN \`super_linea_id\``);
        await queryRunner.query(`ALTER TABLE \`linea\` DROP COLUMN \`superLineaId\``);
        await queryRunner.query(`DROP INDEX \`IDX_16507f51a2d2e59f7e5e4d5e79\` ON \`presentacion\``);
        await queryRunner.query(`DROP TABLE \`presentacion\``);
        await queryRunner.query(`DROP INDEX \`IDX_9e4184946b687e188250ddefea\` ON \`super_linea\``);
        await queryRunner.query(`DROP TABLE \`super_linea\``);
    }

}

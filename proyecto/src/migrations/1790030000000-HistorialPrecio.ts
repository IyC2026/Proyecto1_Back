import { MigrationInterface, QueryRunner } from "typeorm";

export class HistorialPrecio1790030000000 implements MigrationInterface {
    name = 'HistorialPrecio1790030000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`historial_precio\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`precioAnterior\` decimal(15,5) NOT NULL,
                \`precioNuevo\` decimal(15,5) NOT NULL,
                \`motivo\` text NOT NULL,
                \`fecha\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`producto_id\` int NOT NULL,
                \`usuario_id\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
        
        await queryRunner.query(`
            ALTER TABLE \`historial_precio\` 
            ADD CONSTRAINT \`FK_historial_precio_producto\` 
            FOREIGN KEY (\`producto_id\`) REFERENCES \`producto\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE \`historial_precio\` 
            ADD CONSTRAINT \`FK_historial_precio_usuario\` 
            FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`historial_precio\` DROP FOREIGN KEY \`FK_historial_precio_usuario\``);
        await queryRunner.query(`ALTER TABLE \`historial_precio\` DROP FOREIGN KEY \`FK_historial_precio_producto\``);
        await queryRunner.query(`DROP TABLE \`historial_precio\``);
    }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class DropRedundantColumns1790197765166 implements MigrationInterface {
    name = 'DropRedundantColumns1790197765166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const historialTable = await queryRunner.getTable('historial_precio');
        const productoForeignKey = historialTable?.foreignKeys.find(
            (foreignKey) => foreignKey.name === 'FK_historial_precio_producto',
        );
        const usuarioForeignKey = historialTable?.foreignKeys.find(
            (foreignKey) => foreignKey.name === 'FK_historial_precio_usuario',
        );

        if (productoForeignKey) {
            await queryRunner.dropForeignKey('historial_precio', productoForeignKey);
        }
        if (usuarioForeignKey) {
            await queryRunner.dropForeignKey('historial_precio', usuarioForeignKey);
        }
        if (await queryRunner.hasColumn('linea', 'superLineaId')) {
            await queryRunner.query(`ALTER TABLE \`linea\` DROP COLUMN \`superLineaId\``);
        }
        if (await queryRunner.hasColumn('producto', 'presentacionId')) {
            await queryRunner.query(`ALTER TABLE \`producto\` DROP COLUMN \`presentacionId\``);
        }
        await queryRunner.query(`ALTER TABLE \`historial_precio\` CHANGE \`precioAnterior\` \`precioAnterior\` decimal(15,5) NOT NULL DEFAULT '0.00000'`);
        await queryRunner.query(`ALTER TABLE \`historial_precio\` CHANGE \`precioNuevo\` \`precioNuevo\` decimal(15,5) NOT NULL DEFAULT '0.00000'`);
        await queryRunner.query(`ALTER TABLE \`historial_precio\` ADD CONSTRAINT \`FK_e2f1eed194c44ae80d797cb6d1b\` FOREIGN KEY (\`producto_id\`) REFERENCES \`producto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`historial_precio\` ADD CONSTRAINT \`FK_88811c48612db1861d3c0398831\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`historial_precio\` DROP FOREIGN KEY \`FK_88811c48612db1861d3c0398831\``);
        await queryRunner.query(`ALTER TABLE \`historial_precio\` DROP FOREIGN KEY \`FK_e2f1eed194c44ae80d797cb6d1b\``);
        await queryRunner.query(`ALTER TABLE \`historial_precio\` CHANGE \`precioNuevo\` \`precioNuevo\` decimal(15,5) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`historial_precio\` CHANGE \`precioAnterior\` \`precioAnterior\` decimal(15,5) NOT NULL`);
        if (!(await queryRunner.hasColumn('producto', 'presentacionId'))) {
            await queryRunner.query(`ALTER TABLE \`producto\` ADD \`presentacionId\` int NULL`);
        }
        if (!(await queryRunner.hasColumn('linea', 'superLineaId'))) {
            await queryRunner.query(`ALTER TABLE \`linea\` ADD \`superLineaId\` int NULL`);
        }
        await queryRunner.query(`ALTER TABLE \`historial_precio\` ADD CONSTRAINT \`FK_historial_precio_usuario\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`historial_precio\` ADD CONSTRAINT \`FK_historial_precio_producto\` FOREIGN KEY (\`producto_id\`) REFERENCES \`producto\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

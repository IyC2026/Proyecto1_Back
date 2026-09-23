import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixLineaSuperLineaColumn1790031000000 implements MigrationInterface {
  name = 'FixLineaSuperLineaColumn1790031000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasObsoleteColumn = await queryRunner.hasColumn('linea', 'superLineaId');

    if (hasObsoleteColumn) {
      await queryRunner.query('ALTER TABLE `linea` DROP COLUMN `superLineaId`');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasObsoleteColumn = await queryRunner.hasColumn('linea', 'superLineaId');

    if (!hasObsoleteColumn) {
      await queryRunner.query('ALTER TABLE `linea` ADD `superLineaId` int NULL');
    }
  }
}

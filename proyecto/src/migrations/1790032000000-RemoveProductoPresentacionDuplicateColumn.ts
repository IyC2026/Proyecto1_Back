import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveProductoPresentacionDuplicateColumn1790032000000
  implements MigrationInterface
{
  name = 'RemoveProductoPresentacionDuplicateColumn1790032000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasObsoleteColumn = await queryRunner.hasColumn('producto', 'presentacionId');

    if (hasObsoleteColumn) {
      await queryRunner.query('ALTER TABLE `producto` DROP COLUMN `presentacionId`');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasObsoleteColumn = await queryRunner.hasColumn('producto', 'presentacionId');

    if (!hasObsoleteColumn) {
      await queryRunner.query('ALTER TABLE `producto` ADD `presentacionId` int NULL');
    }
  }
}

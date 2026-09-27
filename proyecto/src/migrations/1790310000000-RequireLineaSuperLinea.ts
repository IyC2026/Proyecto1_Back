import { MigrationInterface, QueryRunner } from 'typeorm';

export class RequireLineaSuperLinea1790310000000 implements MigrationInterface {
  name = 'RequireLineaSuperLinea1790310000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO \`super_linea\` (\`denominacion\`, \`sistema\`)
      SELECT 'GENERAL', 1
      WHERE NOT EXISTS (
        SELECT 1 FROM \`super_linea\`
        WHERE UPPER(\`denominacion\`) = 'GENERAL' AND \`deletedAt\` IS NULL
      )
    `);

    await queryRunner.query(`
      UPDATE \`linea\`
      SET \`super_linea_id\` = (
        SELECT general.\`id\`
        FROM (
          SELECT \`id\` FROM \`super_linea\`
          WHERE UPPER(\`denominacion\`) = 'GENERAL' AND \`deletedAt\` IS NULL
          ORDER BY \`id\` ASC
          LIMIT 1
        ) general
      )
      WHERE \`super_linea_id\` IS NULL
    `);

    await queryRunner.query(
      'ALTER TABLE `linea` MODIFY `super_linea_id` int NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `linea` MODIFY `super_linea_id` int NULL',
    );
  }
}

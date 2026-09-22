import { MigrationInterface, QueryRunner } from "typeorm";

export class HistorialPrecio1790030000000 implements MigrationInterface {
    name = 'HistorialPrecio1790030000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "historial_precio" (
                "id" SERIAL NOT NULL,
                "precioAnterior" numeric(15,2) NOT NULL,
                "precioNuevo" numeric(15,2) NOT NULL,
                "motivo" text NOT NULL,
                "fecha" TIMESTAMP NOT NULL DEFAULT now(),
                "producto_id" integer NOT NULL,
                "usuario_id" integer NOT NULL,
                CONSTRAINT "PK_historial_precio" PRIMARY KEY ("id")
            )
        `);
        
        await queryRunner.query(`
            ALTER TABLE "historial_precio" 
            ADD CONSTRAINT "FK_historial_precio_producto" 
            FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "historial_precio" 
            ADD CONSTRAINT "FK_historial_precio_usuario" 
            FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "historial_precio" DROP CONSTRAINT "FK_historial_precio_usuario"`);
        await queryRunner.query(`ALTER TABLE "historial_precio" DROP CONSTRAINT "FK_historial_precio_producto"`);
        await queryRunner.query(`DROP TABLE "historial_precio"`);
    }
}

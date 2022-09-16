import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migratrion1663275067348 implements MigrationInterface {
  name = 'Migratrion1663275067348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Afiliados_LibrePago" ("id" int NOT NULL IDENTITY(1,1), "id_afiliado" int, CONSTRAINT "PK_86063f5681abe087ad160c4afef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_177e9ceb77e990b658d043bedb" ON "Afiliados_LibrePago" ("id_afiliado") WHERE "id_afiliado" IS NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Afiliados_LibrePago" ADD CONSTRAINT "FK_177e9ceb77e990b658d043bedbe" FOREIGN KEY ("id_afiliado") REFERENCES "afiliados"("afiCod") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Afiliados_LibrePago" DROP CONSTRAINT "FK_177e9ceb77e990b658d043bedbe"`,
    );
    await queryRunner.query(
      `DROP INDEX "REL_177e9ceb77e990b658d043bedb" ON "Afiliados_LibrePago"`,
    );
    await queryRunner.query(`DROP TABLE "Afiliados_LibrePago"`);
  }
}

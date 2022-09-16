import { MigrationInterface, QueryRunner } from "typeorm";

export class Migratrion1663344095317 implements MigrationInterface {
    name = 'Migratrion1663344095317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Afiliados_LibrePago" ("id" int NOT NULL IDENTITY(1,1), "afiliado" varchar(15), CONSTRAINT "PK_86063f5681abe087ad160c4afef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_c96b9e0d6a5f168e1c223951fb" ON "Afiliados_LibrePago" ("afiliado") WHERE "afiliado" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Afiliados_LibrePago" ADD CONSTRAINT "FK_c96b9e0d6a5f168e1c223951fbd" FOREIGN KEY ("afiliado") REFERENCES "afiliados"("afiCod") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Afiliados_LibrePago" DROP CONSTRAINT "FK_c96b9e0d6a5f168e1c223951fbd"`);
        await queryRunner.query(`DROP INDEX "REL_c96b9e0d6a5f168e1c223951fb" ON "Afiliados_LibrePago"`);
        await queryRunner.query(`DROP TABLE "Afiliados_LibrePago"`);
    }

}

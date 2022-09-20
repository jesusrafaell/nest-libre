import { MigrationInterface, QueryRunner } from "typeorm";

export class Migratrion1663691981485 implements MigrationInterface {
    name = 'Migratrion1663691981485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "origin_logs_librepago" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_801aa7826fa0a8b1cb4a312ae4e" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_00866207223a8bfe811b7d1e220" DEFAULT getdate(), CONSTRAINT "PK_a6636f1be43b167d1f226a13b0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "general_logs_librepago" ("id" int NOT NULL IDENTITY(1,1), "descript" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_176f749928888c5c1e337d631f6" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_fb4e1e05bf81da20d0172a7c686" DEFAULT getdate(), "id_user" int, "id_origin_logs" int, CONSTRAINT "PK_2784ad2cdf153e1de4629827fe0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Afiliados_LibrePago" ("id" int NOT NULL IDENTITY(1,1), "afiliado" nvarchar(255) NOT NULL, CONSTRAINT "UQ_c96b9e0d6a5f168e1c223951fbd" UNIQUE ("afiliado"), CONSTRAINT "PK_86063f5681abe087ad160c4afef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "general_logs_librepago" ADD CONSTRAINT "FK_5cf09da3a79180bcc2a14495270" FOREIGN KEY ("id_user") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "general_logs_librepago" ADD CONSTRAINT "FK_b6780f9baa6352a5d06a1729c87" FOREIGN KEY ("id_origin_logs") REFERENCES "origin_logs_librepago"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "general_logs_librepago" DROP CONSTRAINT "FK_b6780f9baa6352a5d06a1729c87"`);
        await queryRunner.query(`ALTER TABLE "general_logs_librepago" DROP CONSTRAINT "FK_5cf09da3a79180bcc2a14495270"`);
        await queryRunner.query(`DROP TABLE "Afiliados_LibrePago"`);
        await queryRunner.query(`DROP TABLE "general_logs_librepago"`);
        await queryRunner.query(`DROP TABLE "origin_logs_librepago"`);
    }

}

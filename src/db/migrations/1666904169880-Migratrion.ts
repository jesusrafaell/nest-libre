import { MigrationInterface, QueryRunner } from "typeorm";

export class Migratrion1666904169880 implements MigrationInterface {
    name = 'Migratrion1666904169880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "afiliados_api" ("id" int NOT NULL IDENTITY(1,1), "afiliado" nvarchar(255) NOT NULL, CONSTRAINT "UQ_2be39ac2eabe4dfde26ef9e9c89" UNIQUE ("afiliado"), CONSTRAINT "PK_9a6f537883408e0191f2f86ebfc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "afiliados_api"`);
    }

}

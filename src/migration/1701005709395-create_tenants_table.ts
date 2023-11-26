import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTenantsTable1701005709395 implements MigrationInterface {
    name = 'CreateTenantsTable1701005709395';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "tenants" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "address" character varying(255) NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "refreshTokens" DROP COLUMN "name"`,
        );
        await queryRunner.query(
            `ALTER TABLE "refreshTokens" DROP COLUMN "address"`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "refreshTokens" ADD "address" character varying(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "refreshTokens" ADD "name" character varying(100) NOT NULL`,
        );
        await queryRunner.query(`DROP TABLE "tenants"`);
    }
}

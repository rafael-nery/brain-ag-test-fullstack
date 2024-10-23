import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729641570007 implements MigrationInterface {
    name = 'Migration1729641570007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "producer" ("id" SERIAL NOT NULL, "cpfCnpj" character varying NOT NULL, "name" character varying NOT NULL, "farmName" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "totalArea" double precision NOT NULL, "arableLand" double precision NOT NULL, "vegetationArea" double precision NOT NULL, "crops" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_416a6709f5bdb2dd4f6ffd6f4fb" UNIQUE ("cpfCnpj"), CONSTRAINT "PK_4cfe496c2c70e4c9b9f444525a6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "producer"`);
    }

}

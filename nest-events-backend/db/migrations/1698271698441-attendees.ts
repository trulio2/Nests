import { MigrationInterface, QueryRunner } from "typeorm";

export class Attendees1698271698441 implements MigrationInterface {
    name = 'Attendees1698271698441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attendee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "eventId" uuid, CONSTRAINT "PK_070338c19378315cb793abac656" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD CONSTRAINT "FK_7d85e02cada107c99eb697dd1fe" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendee" DROP CONSTRAINT "FK_7d85e02cada107c99eb697dd1fe"`);
        await queryRunner.query(`DROP TABLE "attendee"`);
    }

}

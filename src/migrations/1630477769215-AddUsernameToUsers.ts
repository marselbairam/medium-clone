import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsernameToUsers1630477769215 implements MigrationInterface {
    name = 'AddUsernameToUsers1630477769215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "username"`);
    }

}

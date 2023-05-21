import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBejelentkezesTable1621528463442 implements MigrationInterface {
    name = 'CreateBejelentkezesTable1621528463442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `bejelentkezes` (`email` varchar(255) NOT NULL, `jelszo` varchar(255) NOT NULL, `hasznal` tinyint NOT NULL, PRIMARY KEY (`email`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `bejelentkezes`");
    }

}

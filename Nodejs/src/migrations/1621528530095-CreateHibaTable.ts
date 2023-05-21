import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateHibaTable1621528530095 implements MigrationInterface {
    name = 'CreateHibaTable1621528530095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `hiba` (`id` int NOT NULL AUTO_INCREMENT, `Komponens` varchar(64) NOT NULL, `Adat` int NOT NULL, `Idopillanat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `hiba`");
    }

}

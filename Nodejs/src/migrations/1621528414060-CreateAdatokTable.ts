import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAdatokTable1621528414060 implements MigrationInterface {
    name = 'CreateAdatokTable1621528414060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `adatok` (`Komponens` varchar(64) NOT NULL, `Adat` int NOT NULL, `Felvet` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`Komponens`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `adatok`");
    }

}

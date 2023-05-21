import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateActiveTable1621528355125 implements MigrationInterface {
    name = 'CreateActiveTable1621528355125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `active` (`Komp` varchar(255) NOT NULL, PRIMARY KEY (`Komp`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `active`");
    }

}

import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class UserHasBulletinMigration1649658383277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('bulletins', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'cascade'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

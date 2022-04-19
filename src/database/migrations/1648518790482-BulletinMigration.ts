import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class BulletinMigration1648518790482 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'bulletins',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'body',
                    type: 'longtext'
                },
                {
                    name: 'image',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: true,
                    default: null
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: true,
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: true,
                    default: 'now()',
                    onUpdate: 'now()'
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserMigration1648518964181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
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
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: 'is_email_verified',
                    type: 'timestamp',
                    isNullable: true
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

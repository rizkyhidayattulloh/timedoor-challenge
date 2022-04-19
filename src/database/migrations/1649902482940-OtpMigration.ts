import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class OtpMigration1649902482940 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'otps',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true
                },
                {
                    name: 'user_id',
                    type: 'int'
                },
                {
                    name: 'token',
                    type: 'longtext'
                },
                {
                    name: 'expired_at',
                    type: 'timestamp'
                },
                {
                    name: 'verified_at',
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

        await queryRunner.createForeignKey('otps', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'cascade'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

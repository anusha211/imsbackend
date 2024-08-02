import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserandRelations1722101219467 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    // Create User Table
    await queryRunner.createTable(
        new Table({
          name: 'user',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
              isNullable: false,
            },
            {
              name: 'password',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'age',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'internshipId',
              type: 'int',
              isNullable: true, // Allows users to not have an internship
            },
          ],
          foreignKeys: [
            {
              columnNames: ['internshipId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'internship',
              onDelete: 'SET NULL', // Optional: Define behavior on delete
              //onUpdate: 'CASCADE', // Optional: Define behavior on update
              name: 'FK_user_internship',
            },
          ],
        }),
        true
      );

    }



    public async down(queryRunner: QueryRunner): Promise<void> {
  // Drop the User table
  await queryRunner.dropTable('user');

    }

}

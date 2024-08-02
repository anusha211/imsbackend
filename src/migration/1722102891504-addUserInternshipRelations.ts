import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
  } from 'typeorm';
  
  export class AddInternshipIdToUser1234567890123 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      // Add internshipId column to the user table
      await queryRunner.addColumn(
        'user',
        new TableColumn({
          name: 'internshipId',
          type: 'int',
          isNullable: true, // Allow NULLs if a user can exist without an internship
        })
      );
  
      // Create a foreign key relationship between user and internship
      await queryRunner.createForeignKey(
        'user',
        new TableForeignKey({
          columnNames: ['internshipId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'internship',
          onDelete: 'CASCADE', // Set to NULL if the referenced internship is deleted
          //onUpdate: 'CASCADE', // Update foreign key if the referenced column updates
          name: 'FK_user_internship',
        })
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      // Drop the foreign key first
      await queryRunner.dropForeignKey('user', 'FK_user_internship');
  
      // Drop the internshipId column
      await queryRunner.dropColumn('user', 'internshipId');
    }
  }
  
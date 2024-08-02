import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class UpdateUserInternshiprelation1722429825235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

  
      // Add the new foreign key constraint with onDelete: 'CASCADE'
      await queryRunner.createForeignKey(
        'user',
        new TableForeignKey({
          columnNames: ['internshipId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'internship',
          onDelete: 'CASCADE', // Enables cascading delete
        })
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      // Reverse the operation in the down method
  
      // Drop the current foreign key constraint
      await queryRunner.query(
        `ALTER TABLE user DROP FOREIGN KEY FK_user_internship`
      );
  
      // Restore the original foreign key constraint
      await queryRunner.createForeignKey(
        'user',
        new TableForeignKey({
          columnNames: ['internshipId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'internship',
          onDelete: 'SET NULL', // Restore previous behavior if needed
        })
      );
    }

}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInternshipTable1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'internship',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'mentorName',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'joinedDate',
          type: 'date',
          isNullable: false,
        },
        {
          name: 'completedDate',
          type: 'date',
          isNullable: true,
        },
        {
          name: 'isCertified',
          type: 'Boolean',
        },

      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('internship');
  }
}

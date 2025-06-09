// src/migrations/1234567890123-CreateRolesPermissions.ts

import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateRolesPermissions1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar', isUnique: true },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'permission',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar', isUnique: true },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'role_permissions_map',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'role_id', type: 'int' },
          { name: 'permission_id', type: 'int' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'role_permissions_map',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
        onDelete: 'CASCADE',
        name: 'FK_role_permissions_role', // Unique constraint name
      }),
    );

    await queryRunner.createForeignKey(
      'role_permissions_map',
      new TableForeignKey({
        columnNames: ['permission_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permission',
        onDelete: 'CASCADE',
        name: 'FK_role_permissions_permission', // Unique constraint name
      }),
    );


          // Add Roleid column to the user table
          await queryRunner.addColumn(
            'user',
            new TableColumn({
              name: 'role_id',
              type: 'int',
              isNullable: true,
            })
          );

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
        onDelete: 'SET NULL',
        name: 'FK_user_role', // Unique constraint name
      }),
    );

    // Insert default roles and permissions
    await queryRunner.query(`INSERT INTO role (name) VALUES ('ADMIN'), ('USER')`);
    await queryRunner.query(`INSERT INTO permission (name) VALUES ('CREATE_USER'), ('EDIT_USER'), ('DELETE_USER'), ('ASSIGN_USER_ROLE')`);

    // Map ADMIN role to all permissions
    await queryRunner.query(`INSERT INTO role_permissions_map (role_id, permission_id) VALUES
      (1, 1), (1, 2), (1, 3), (1, 4)`); // ADMIN

    // Map USER role to limited permissions if needed
    await queryRunner.query(`INSERT INTO role_permissions_map (role_id, permission_id) VALUES
      (2, 1), (2, 2)`); // USER
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
 
    //await queryRunner.query(`ALTER TABLE user DROP FOREIGN KEY FK_user_role;`);
    //await queryRunner.query(`ALTER TABLE role_permissions_map DROP FOREIGN KEY FK_role_permissions_role;`);
    await queryRunner.query(`ALTER TABLE role_permissions_map DROP FOREIGN KEY FK_role_permissions_permission;`);

    await queryRunner.dropTable('role_permissions_map');
    await queryRunner.dropTable('permission');
    await queryRunner.dropTable('role');
  }
}

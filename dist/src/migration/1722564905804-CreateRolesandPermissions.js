"use strict";
// src/migrations/1234567890123-CreateRolesPermissions.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRolesPermissions1234567890123 = void 0;
const typeorm_1 = require("typeorm");
class CreateRolesPermissions1234567890123 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'role',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'name', type: 'varchar', isUnique: true },
                ],
            }), true);
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'permission',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'name', type: 'varchar', isUnique: true },
                ],
            }), true);
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'role_permissions_map',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'role_id', type: 'int' },
                    { name: 'permission_id', type: 'int' },
                ],
            }), true);
            yield queryRunner.createForeignKey('role_permissions_map', new typeorm_1.TableForeignKey({
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'role',
                onDelete: 'CASCADE',
                name: 'FK_role_permissions_role', // Unique constraint name
            }));
            yield queryRunner.createForeignKey('role_permissions_map', new typeorm_1.TableForeignKey({
                columnNames: ['permission_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'permission',
                onDelete: 'CASCADE',
                name: 'FK_role_permissions_permission', // Unique constraint name
            }));
            // Add Roleid column to the user table
            yield queryRunner.addColumn('user', new typeorm_1.TableColumn({
                name: 'role_id',
                type: 'int',
                isNullable: true,
            }));
            yield queryRunner.createForeignKey('user', new typeorm_1.TableForeignKey({
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'role',
                onDelete: 'SET NULL',
                name: 'FK_user_role', // Unique constraint name
            }));
            // Insert default roles and permissions
            yield queryRunner.query(`INSERT INTO role (name) VALUES ('ADMIN'), ('USER')`);
            yield queryRunner.query(`INSERT INTO permission (name) VALUES ('CREATE_USER'), ('EDIT_USER'), ('DELETE_USER'), ('ASSIGN_USER_ROLE')`);
            // Map ADMIN role to all permissions
            yield queryRunner.query(`INSERT INTO role_permissions_map (role_id, permission_id) VALUES
      (1, 1), (1, 2), (1, 3), (1, 4)`); // ADMIN
            // Map USER role to limited permissions if needed
            yield queryRunner.query(`INSERT INTO role_permissions_map (role_id, permission_id) VALUES
      (2, 1), (2, 2)`); // USER
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            //await queryRunner.query(`ALTER TABLE user DROP FOREIGN KEY FK_user_role;`);
            //await queryRunner.query(`ALTER TABLE role_permissions_map DROP FOREIGN KEY FK_role_permissions_role;`);
            yield queryRunner.query(`ALTER TABLE role_permissions_map DROP FOREIGN KEY FK_role_permissions_permission;`);
            yield queryRunner.dropTable('role_permissions_map');
            yield queryRunner.dropTable('permission');
            yield queryRunner.dropTable('role');
        });
    }
}
exports.CreateRolesPermissions1234567890123 = CreateRolesPermissions1234567890123;

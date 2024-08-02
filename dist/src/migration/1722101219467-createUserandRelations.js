"use strict";
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
exports.CreateUserandRelations1722101219467 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserandRelations1722101219467 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create User Table
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }), true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Drop the User table
            yield queryRunner.dropTable('user');
        });
    }
}
exports.CreateUserandRelations1722101219467 = CreateUserandRelations1722101219467;

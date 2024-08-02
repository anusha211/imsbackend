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
exports.AddInternshipIdToUser1234567890123 = void 0;
const typeorm_1 = require("typeorm");
class AddInternshipIdToUser1234567890123 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add internshipId column to the user table
            yield queryRunner.addColumn('user', new typeorm_1.TableColumn({
                name: 'internshipId',
                type: 'int',
                isNullable: true, // Allow NULLs if a user can exist without an internship
            }));
            // Create a foreign key relationship between user and internship
            yield queryRunner.createForeignKey('user', new typeorm_1.TableForeignKey({
                columnNames: ['internshipId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'internship',
                onDelete: 'CASCADE', // Set to NULL if the referenced internship is deleted
                //onUpdate: 'CASCADE', // Update foreign key if the referenced column updates
                name: 'FK_user_internship',
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Drop the foreign key first
            yield queryRunner.dropForeignKey('user', 'FK_user_internship');
            // Drop the internshipId column
            yield queryRunner.dropColumn('user', 'internshipId');
        });
    }
}
exports.AddInternshipIdToUser1234567890123 = AddInternshipIdToUser1234567890123;

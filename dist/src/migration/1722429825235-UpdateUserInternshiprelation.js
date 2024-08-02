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
exports.UpdateUserInternshiprelation1722429825235 = void 0;
const typeorm_1 = require("typeorm");
class UpdateUserInternshiprelation1722429825235 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add the new foreign key constraint with onDelete: 'CASCADE'
            yield queryRunner.createForeignKey('user', new typeorm_1.TableForeignKey({
                columnNames: ['internshipId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'internship',
                onDelete: 'CASCADE', // Enables cascading delete
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Reverse the operation in the down method
            // Drop the current foreign key constraint
            yield queryRunner.query(`ALTER TABLE user DROP FOREIGN KEY FK_user_internship`);
            // Restore the original foreign key constraint
            yield queryRunner.createForeignKey('user', new typeorm_1.TableForeignKey({
                columnNames: ['internshipId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'internship',
                onDelete: 'SET NULL', // Restore previous behavior if needed
            }));
        });
    }
}
exports.UpdateUserInternshiprelation1722429825235 = UpdateUserInternshiprelation1722429825235;

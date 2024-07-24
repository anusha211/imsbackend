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
exports.CreateInternshipTable1234567890123 = void 0;
const typeorm_1 = require("typeorm");
class CreateInternshipTable1234567890123 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('internship');
        });
    }
}
exports.CreateInternshipTable1234567890123 = CreateInternshipTable1234567890123;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInternshipSchema = exports.createInternshipSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createInternshipSchema = joi_1.default.object({
    joinedDate: joi_1.default.date().required(),
    completedDate: joi_1.default.date().optional(),
    isCertified: joi_1.default.boolean().required(),
    mentorName: joi_1.default.string().min(3).max(255).required(),
});
exports.updateInternshipSchema = joi_1.default.object({
    joinedDate: joi_1.default.date().optional(),
    completedDate: joi_1.default.date().optional(),
    isCertified: joi_1.default.boolean().optional(),
    mentorName: joi_1.default.string().min(3).max(255).optional(),
});

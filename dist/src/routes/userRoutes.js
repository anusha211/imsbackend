"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const validaterequest_1 = require("../middleware/validaterequest");
const validation_1 = require("../validation/validation");
const internshipControllers_1 = require("../controllers/internshipControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.userRouter = express_1.default.Router();
// Internship Routes
exports.userRouter.post('/internships', authMiddleware_1.authenticateJWT, internshipControllers_1.createInternship);
exports.userRouter.get('/internships', authMiddleware_1.authenticateJWT, internshipControllers_1.getInternshipWithUsers);
exports.userRouter.get('/internships/:id', authMiddleware_1.authenticateJWT, internshipControllers_1.getInternship);
exports.userRouter.put('/internships/:id', authMiddleware_1.authenticateJWT, internshipControllers_1.updateInternship);
exports.userRouter.delete('/internships/:id', authMiddleware_1.authenticateJWT, internshipControllers_1.deleteInternship);
exports.userRouter.post('/', (0, validaterequest_1.validateRequest)(validation_1.createUserSchema), userControllers_1.createUser);
exports.userRouter.post('/userwithinternship', authMiddleware_1.authenticateJWT, userControllers_1.createUserWithInternship);
exports.userRouter.get('/:id', authMiddleware_1.authenticateJWT, userControllers_1.getUserById);
exports.userRouter.put('/:id', authMiddleware_1.authenticateJWT, (0, validaterequest_1.validateRequest)(validation_1.updateUserSchema), userControllers_1.updateUser);
exports.userRouter.delete('/:id', authMiddleware_1.authenticateJWT, userControllers_1.deleteUser);
exports.userRouter.get('/', authMiddleware_1.authenticateJWT, userControllers_1.getUsers);

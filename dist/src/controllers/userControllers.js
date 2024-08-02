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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserWithInternship = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../models/User");
const Internship_1 = require("../models/Internship");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const { name, email, password, age } = req.body;
        const newUser = userRepository.create({ name, email, password, age });
        const savedUser = yield userRepository.save(newUser);
        res.status(201).json(savedUser);
    }
    catch (error) { // Specify error type as 'any' or 'Error'
        res.status(500).json({ message: error.message });
    }
});
exports.createUser = createUser;
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getusers endpoint hit'); // Debugging log
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const users = yield userRepository.find();
        res.status(200).json(users);
    }
    catch (error) { // Specify error type as 'any' or 'Error'
        res.status(500).json({ message: error.message });
    }
});
exports.getUsers = getUsers;
// Get user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) { // Specify error type as 'any' or 'Error'
        res.status(500).json({ message: error.message });
    }
});
exports.getUserById = getUserById;
// Update user by ID
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const internshipRepository = data_source_1.AppDataSource.getRepository(Internship_1.Internship);
        const { name, email, password, age, internshipId } = req.body;
        const user = yield userRepository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ['internship'],
        });
        if (user) {
            const internshipnew = internshipId ? yield internshipRepository.findOne({ where: { id: internshipId } })
                : undefined;
            const updatedData = {
                name,
                email,
                password: yield bcrypt_1.default.hash(password, 10),
                age,
                internship: internshipnew || user.internship,
            };
            userRepository.merge(user, updatedData);
            const updatedUser = yield userRepository.save(user);
            res.status(200).json({ updatedUser, message: 'user updated' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) { // Specify error type as 'any' or 'Error'
        res.status(500).json({ message: error.message });
    }
});
exports.updateUser = updateUser;
// Delete user by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const result = yield userRepository.delete(req.params.id);
        if (result.affected) {
            res.status(200).json({ message: 'User deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) { // Specify error type as 'any' or 'Error'
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
// Create a new user and associate with an internship
const createUserWithInternship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, age, password, internshipId } = req.body;
    try {
        const internshipRepository = data_source_1.AppDataSource.getRepository(Internship_1.Internship);
        const internship = yield internshipRepository.findOneBy({ id: internshipId });
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword,
            age,
            internship, // Associate user with internship
        });
        yield userRepository.save(newUser);
        return res.status(201).json({ message: 'User created successfully', newUser });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
});
exports.createUserWithInternship = createUserWithInternship;

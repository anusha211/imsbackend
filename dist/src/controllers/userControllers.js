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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../models/User");
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
        const { name, email, password } = req.body;
        const user = yield userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (user) {
            userRepository.merge(user, { name, email, password });
            const updatedUser = yield userRepository.save(user);
            res.status(200).json(updatedUser);
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.createUser = exports.resetUsers = void 0;
const validation_1 = require("../validation/validation");
let users = [];
const resetUsers = () => {
    users = [];
};
exports.resetUsers = resetUsers;
const createUser = (req, res) => {
    const { name, email, age } = req.body;
    const { error } = validation_1.createUserSchema.validate({ name, email, age });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    /*
      if (error) {
        // Different error messages based on conditions
        if (error.details.some((detail) => detail.type === 'string.base')) {
          return res.status(400).json({ error: 'Name must be a string' });
        }
        if (error.details.some((detail) => detail.type === 'string.email')) {
          return res.status(400).json({ error: 'Invalid email format' });
        }
        if (error.details.some((detail) => detail.type === 'number.base')) {
          return res.status(400).json({ error: 'Age must be a number' });
        }
    
        // Default error message
      //  return res.status(400).json({ error: 'Invalid data provided' });
      }
    */
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        internships: undefined,
    };
    users.push(newUser);
    res.status(201).json(newUser);
};
exports.createUser = createUser;
const getUserById = (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
};
exports.getUserById = getUserById;
const updateUserById = (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const { error } = validation_1.updateUserSchema.validate({ name, email, age });
    if (error) {
        // Different error messages based on conditions
        if (error.details.some((detail) => detail.type === 'string.base')) {
            return res.status(400).json({ error: 'Name must be a string' });
        }
        if (error.details.some((detail) => detail.type === 'string.email')) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        if (error.details.some((detail) => detail.type === 'number.base')) {
            return res.status(400).json({ error: 'Age must be a number' });
        }
        // Default error message
        return res.status(400).json({ error: 'Invalid data provided' });
    }
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
        if (name)
            user.name = name;
        if (email)
            user.email = email;
        if (age)
            user.age = age;
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
};
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id !== parseInt(id));
    res.status(204).send('user successfully deleted');
};
exports.deleteUserById = deleteUserById;
const listUsers = (req, res) => {
    res.json(users);
};
exports.listUsers = listUsers;

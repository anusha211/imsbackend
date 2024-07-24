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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const userRoutes_1 = require("../src/routes/userRoutes");
const User_1 = require("../src/models/User");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/users', userRoutes_1.userRouter);
const testDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '@rootgo123!',
    database: 'userdb',
    synchronize: false,
    logging: false,
    entities: [User_1.User],
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testDataSource.initialize();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testDataSource.destroy();
}));
describe('User Controller', () => {
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post('/users')
            .send({
            name: 'John Doe',
            email: 'john.doe@example.com',
            age: 30,
            password: 'password123',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    }));
    it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    }));
    it('should get a single user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield (0, supertest_1.default)(app)
            .post('/users')
            .send({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: 'password123',
            age: 25,
        });
        const res = yield (0, supertest_1.default)(app).get(`/users/${newUser.body.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', newUser.body.id);
    }));
    it('should update a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield (0, supertest_1.default)(app)
            .post('/users')
            .send({
            name: 'Mark Doe',
            email: 'mark.doe@example.com',
            password: 'password123',
            age: 40,
        });
        const res = yield (0, supertest_1.default)(app)
            .put(`/users/${newUser.body.id}`)
            .send({
            name: 'Mark Smith',
            email: 'mark.smith@example.com',
            age: 41,
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Mark Smith');
    }));
    it('should delete a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield (0, supertest_1.default)(app)
            .post('/users')
            .send({
            name: 'Laura Doe',
            email: 'laura.doe@example.com',
            password: 'password123',
            age: 35,
        });
        const res = yield (0, supertest_1.default)(app).delete(`/users/${newUser.body.id}`);
        expect(res.statusCode).toEqual(204);
    }));
});

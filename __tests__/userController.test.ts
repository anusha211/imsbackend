import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';
import {userRouter} from '../src/routes/userRoutes';
import { User } from '../src/models/User';

const app = express();
app.use(bodyParser.json());
app.use('/users', userRouter);

const testDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [User],
});

beforeAll(async () => {
    await testDataSource.initialize();
});

afterAll(async () => {
    await testDataSource.destroy();
});

describe('User Controller', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com',
                age: 30,
                password: 'password123',
              
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should get a single user by ID', async () => {
        const newUser = await request(app)
            .post('/users')
            .send({
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                password: 'password123',
                age: 25,
            });

        const res = await request(app).get(`/users/${newUser.body.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', newUser.body.id);
    });

    it('should update a user by ID', async () => {
        const newUser = await request(app)
            .post('/users')
            .send({
                name: 'Mark Doe',
                email: 'mark.doe@example.com',
                password: 'password123',
                age: 40,
            });

        const res = await request(app)
            .put(`/users/${newUser.body.id}`)
            .send({
                name: 'Mark Smith',
                email: 'mark.smith@example.com',
                age: 41,
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Mark Smith');
    });

    it('should delete a user by ID', async () => {
        const newUser = await request(app)
            .post('/users')
            .send({
                name: 'Laura Doe',
                email: 'laura.doe@example.com',
                password: 'password123',
                age: 35,
            });

        const res = await request(app).delete(`/users/${newUser.body.id}`);
        expect(res.statusCode).toEqual(204);
    });
});

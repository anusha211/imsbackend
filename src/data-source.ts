import 'reflect-metadata';
import * as mysqlDriver from 'mysql2';
import { DataSource } from 'typeorm';
import { User } from './models/User';
import { Internship } from './models/Internship';

export const AppDataSource = new DataSource({
  driver: mysqlDriver,
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '@rootgo123!',  // Replace with your MySQL password
  database: 'userdb',    // Replace with your database name
  synchronize: false,
  logging: true,
  entities: [User,Internship],
  migrations: [ "dist/src/migration/**/*.js"],

  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

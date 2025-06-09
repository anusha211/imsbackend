import 'reflect-metadata';
import * as mysqlDriver from 'mysql2';
import { DataSource } from 'typeorm';
import { User } from './models/User';
import { Internship } from './models/Internship';
import { Role } from './models/Role';
import { Permission } from './models/Permission';
import { RolePermissionsMap } from './models/RolePermissionsMap';
import  dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  driver: mysqlDriver,
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  // Use environment variable here
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User,Internship,Role, Permission, RolePermissionsMap],
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

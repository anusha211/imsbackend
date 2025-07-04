"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const mysqlDriver = __importStar(require("mysql2"));
const typeorm_1 = require("typeorm");
const User_1 = require("./models/User");
const Internship_1 = require("./models/Internship");
const Role_1 = require("./models/Role");
const Permission_1 = require("./models/Permission");
const RolePermissionsMap_1 = require("./models/RolePermissionsMap");
exports.AppDataSource = new typeorm_1.DataSource({
    driver: mysqlDriver,
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '@rootgo123!', // Replace with your MySQL password
    database: 'userdb', // Replace with your database name
    synchronize: false,
    logging: true,
    entities: [User_1.User, Internship_1.Internship, Role_1.Role, Permission_1.Permission, RolePermissionsMap_1.RolePermissionsMap],
    migrations: ["dist/src/migration/**/*.js"],
    subscribers: [],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});

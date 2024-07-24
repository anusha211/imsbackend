"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = require("./routes/userRoutes");
const data_source_1 = require("./data-source");
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
data_source_1.AppDataSource.initialize().then(() => {
    app.use('/api/users', userRoutes_1.userRouter);
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});

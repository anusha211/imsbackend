import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {userRouter} from './routes/userRoutes';
import { AppDataSource } from './data-source';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

AppDataSource.initialize().then(() => {
  app.use('/api/users', userRouter);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});

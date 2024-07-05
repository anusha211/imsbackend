import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routes/userRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Routes
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});

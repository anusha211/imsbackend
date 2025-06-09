import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {userRouter} from './routes/userRoutes';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';
import authrouter from './routes/authRoutes';
import esclient from './Utils/elasticsearchClient';
dotenv.config();

const app = express();
const PORT = 5000;



app.use(cors());
app.use(bodyParser.json());

AppDataSource.initialize().then(() => {
  app.use('/api/auth',authrouter)
  app.use('/api/users', userRouter);

  app.get('/search', async (req, res) => {
    const q = req.query.q as string; // Ensure q is treated as a string
    if (!q) {
      return res.status(400).send('Query parameter is required');
    }
    try {
      const response = await esclient.search({
        index: 'users',
        body: {
          query: {
            multi_match: {
              query: q,
              fields: ['name^3', 'email'],
            },
          },
        },
      });

      res.send(response.hits.hits);
    } catch (error) {
      console.error('Elasticsearch search error:', error);
      res.status(500).send('Search failed');
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});

import express from 'express';
const app = express();
import dotenv from "dotenv";
import connectDB from "./config/db"
dotenv.config();
const port = 4000;
import routes from './routes';
import { errorConverter, errorHandler } from './middleware/error';
import cors from 'cors';

(async () => {
  await connectDB();

  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('API is running');
  });


  app.use('/api', routes);

  app.use(errorConverter)

  app.use(errorHandler)

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });

})();
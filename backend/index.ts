import express from 'express';
import cors from 'cors';
import shorterRouter from './routes/shorter';
import mongoose from 'mongoose';
import config from './config';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));
app.use('/links', shorterRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server running on ${port} port.`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
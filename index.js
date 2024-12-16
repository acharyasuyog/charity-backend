import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import connectDB from './config/database.config.js';
import mainRouter from './routes/index.route.js';

connectDB();

const app = express();
app.use(express.json());

app.use('/api/v1', mainRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

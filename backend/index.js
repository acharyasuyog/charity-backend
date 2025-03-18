import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import connectDB from './config/database.config.js';
import mainRouter from './routes/index.route.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

// Connect to DB
connectDB();

app.use(cors());

app.use(express.json());

// Main routes
app.use('/api/v1', mainRouter);

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import connectDB from './config/database.config.js';
import mainRouter from './routes/index.route.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');

connectDB();
import cors from 'cors'; /// for testing only
const app = express();
app.use(express.json());
app.use('/api/v1', mainRouter);
app.use(cors()); // Allow all origins

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

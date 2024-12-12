import express from 'express';
import cors from 'cors';

import routes from './routes/routes.js';
import ws from 'ws';
import { neonConfig } from '@neondatabase/serverless';
neonConfig.webSocketConstructor = ws;


const app = express();

app.use(cors());
app.use(express.json());  // Add middleware to parse JSON bodies

app.use(routes);
app.get("/", (req, res) => res.send("API service is running normally"));

app.listen(3000, () => console.log("Server ready on port 3000."));

export default app;
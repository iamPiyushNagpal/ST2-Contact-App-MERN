import path from 'path';
import express from 'express';
import connectDb from './database/db.js';
import contactRoutes from './routes/contactRoutes.js';

connectDb();

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(contactRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));

app.listen(port, () => console.log(`Server started spinning on port ${port}`));
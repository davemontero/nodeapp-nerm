import 'dotenv/config'
import './database/conndb.js'
import express from "express";
import authRouter from './routes/auth.route.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use('/api/v1/auth', authRouter)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
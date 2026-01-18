import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

import path from 'path'
import { fileURLToPath } from 'url';
import resumeRoutes from './routes/resumeRoutes.js';

import atsRouter from './routes/ats.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express();
const PORT = 4000;

app.use(cors())

// connect DB
connectDB();

//middlware
app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/resume',resumeRoutes)

app.use("/api/ats", atsRouter); // ats optimizer

app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'), {
        setHeaders: (res, _path) => {
            res.set('Access-control-Allow-Origin', 'http://localhost:5173')
        }
    })
)

//routes
app.get('/',(req,res)=>{
    res.send("Api work")
})

app.listen(PORT, ()=>{
    console.log(`server start on http://localhost:${PORT}`);
    
})
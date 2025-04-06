import express from 'express';
import authrouter from './routes/auth.js';

import { ENV_VARS } from './config/envVar.js';


import { connectDB } from './config/db.js';
const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use('/api/v1/auth',authrouter);


app.listen(PORT,()=>{
    console.log('server is running' + PORT);
    connectDB();
})
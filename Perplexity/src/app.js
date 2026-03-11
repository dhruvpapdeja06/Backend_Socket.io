import "dotenv/config";
import express from 'express';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
const app = express();



// middleware
app.use(express.json());
app.use(express.urlencoded({express: true}));
app.use(cookieParser());

// Health Check
app.get('/',(req,res)=>{
    res.json({ message: "Server is running"});
})



//Routes

/*
 @routes  register
 POST /api/auth/register
*/
app.use('/api/auth',authRouter);





export default app;
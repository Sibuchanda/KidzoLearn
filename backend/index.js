import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRoute from './routes/user.js';
import taskRoute from './routes/task.js';
import connectDB from "./model/connect.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}))
//Databae connecion
connectDB(process.env.DB_URL);

//Routes
app.use("/user",userRoute);
app.use("/task",taskRoute);


app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT}`)
});
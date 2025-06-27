import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRoute from './routes/user.js';
import taskRoute from './routes/task.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;
// const DB_URI="mongodb+srv://sibuchanda457:fanCgDryz1wEgaqh@cluster0.nq9wq9f.mongodb.net/kidzo_school"
const DB_URI="mongodb://127.0.0.1:27017/kidzo_school";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}))

//--------- Database connection ---------
try {
    await mongoose.connect(DB_URI)
    console.log("Successfully connected to MongoDB...!");
} catch (err) {
    console.log(err);
}

app.use("/user",userRoute);
app.use("/task",taskRoute);


app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT}`)
});
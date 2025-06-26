import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoutes.js";


const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // your frontend's origin
  credentials: true // allow cookies
}));
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{

    console.log("DB connected Successfully")
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    } )
}).catch(error => console.log(error));

app.use("/api", route);
import express from 'express';
import dotenv from "dotenv"
import { connectDb } from './config/db.js';
import productsRoute from "./routes/products.route.js"
import path from "path"
const app = express();


dotenv.config();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json())

app.use("/api" , productsRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname , "/frontend/dist")))
    app.get("*" , (req , res)=>{
        res.sendFile(path.resolve(__dirname , "frontend" , "dist" , "index.html"))
    })
}

app.listen(PORT , ()=>{
    connectDb()
    console.log(`Server Running in Port ${PORT}`)
})
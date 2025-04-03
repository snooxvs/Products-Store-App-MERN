import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {connectDB} from './config/connectDB.js'
import productRoute from './routes/productRoute.js'

dotenv.config()

const app = express()
connectDB()

const __dirname = path.resolve();

app.use(express.json())
app.use('/api/products',productRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))
    
}

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port : ${process.env.PORT}`)
})
import path from "path"
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDb from "./config/db.js"
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"

import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"

dotenv.config()

connectDb()

const app = express()

if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("API IS RUNNING ...")
})

app.use("/api/products",productRoutes)
app.use("/api/users",userRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/upload",uploadRoutes)

app.get(`/api/config/paypal`,(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()     //since we are using es6
app.use("/uploads",express.static(path.join(__dirname,"/uploads")))    //we have to make uploads static to upload images

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
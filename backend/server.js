import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"

import productRoutes from "./routes/productRoutes.js"

dotenv.config()

connectDb()

const app = express()

app.get("/",(req,res)=>{
    res.send("API IS RUNNING ...")
})

app.use("/api/products",productRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
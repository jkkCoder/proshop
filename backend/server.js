import path from "path"
import express, { response } from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDb from "./config/db.js"
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"
import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

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

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)
const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS["private_key"],
        client_email: CREDENTIALS["client_email"]
    }
}
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

// Define a route to handle incoming messages from Dialogflow
app.post('/dialogflow', async (req, res) => {
    // Get the message text and session ID from the request body
    const { message } = req.body;
    const sessionId = uuidv4()

    console.log("message sent is ",message)
  
    // Set up the text query and language code for Dialogflow
    const request = {
      session : sessionClient.projectAgentSessionPath(CREDENTIALS['project_id'], sessionId),
      queryInput: {
        text: {
          text: "check my cart",
          languageCode: 'en-US',
        },
      },
    };
  
    try {
      // Send the text query to Dialogflow and receive a response
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;

      console.log("response is ",responses)
      console.log("result is ",result)
  
      res.json({message: result.fulfillmentText})
    } catch (err) {
      console.error('ERROR:', err);
      res.json({ message: 'An error occurred' });
    }
  });

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
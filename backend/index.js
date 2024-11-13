import express from "express";
import mongoose from 'mongoose';

import { MONGO_URL, PORT } from "./config.js";
import { bookRouter } from "./routes/bookList.js";
import cors from 'cors'


const app = express();

app.use(express.json())

// Middleware for handling CORS Policy
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcome to the Book Store')
})

app.use("/api/v1/books", bookRouter)

mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected");
    // run the express server only if the database connected
    app.listen(PORT, () => {
        console.log(`Listening to port: ${PORT}`);
    })
}).catch((error) => {
    console.log(error);
})

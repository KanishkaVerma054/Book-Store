import express from "express";
import mongoose from 'mongoose';

import { MONGO_URL, PORT } from "./config.js";
import { bookRouter } from "./routes/bookList.js";

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the Book Store')
})

app.use(express.json())


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

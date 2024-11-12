import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookListSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    publishingYear: {type: Number, required: true},
},{
    timestamps: true, // for time of creation & time of last update
})

export const BookModel = mongoose.model("BookLists", bookListSchema)
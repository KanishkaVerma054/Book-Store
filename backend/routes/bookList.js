import { Router } from "express";
import { BookModel } from "../models/bookModel.js";

export const bookRouter = Router();

// Add books to the database
bookRouter.post('/', async (req, res) => {
    try {
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishingYear: req.body.publishingYear,
        }
        const book = await BookModel.create(newBook);
        

        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        })
    }
})

// Get all books from the database

bookRouter.get("/", async (req, res) => {
    try {
        const books = await BookModel.find({}) // get all books

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message
        })
        
    }
})

// Get one book from db by id

bookRouter.get("/:id", async (req, res) => {
    try {
        const{ id } = req.params;

        const book = await BookModel.findById(id) // get one book by id

        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message
        })
        
    }
})

// Update the book

bookRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updateBook = await BookModel.findByIdAndUpdate(id, req.body)
        if(!updateBook) {
            return res.status(404).json({ message: "Book not found"})
        }
        return res.status(200).send({
            message: "Book updated successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        })
    }
})

// Deleting a book

bookRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteBook = await BookModel.findByIdAndDelete(id);
        if(!deleteBook) {
            return res.status(404).json({ message: "Book not found"})
        }
        return res.status(200).send({
            message: "Book deleted succesfully"
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        })
    }
})
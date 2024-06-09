const express = require('express')

const Router = express.Router()

const {
    createBook,
    getBook,
    getBooks,
    updateBook,
    deleteBook
} = require('../controller/book.controller.js')

Router.post('/', createBook)
Router.get('/', getBooks)
Router.get('/:id', getBook)
Router.put('/:id', updateBook)
Router.delete('/:id', deleteBook)

module.exports = Router;

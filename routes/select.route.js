const express = require('express')

const Router = express.Router()


const {
    selectBook, 
    showBooks,
    showBook,
    deleteBook,
    verifyJWT
} = require('../controller/select.controller.js')

Router.post('/select', verifyJWT, selectBook)
Router.get('/select', verifyJWT, showBooks)
Router.get('/select/:id', verifyJWT, showBook)
Router.delete('/select/:id', verifyJWT, deleteBook)

  
module.exports = Router;

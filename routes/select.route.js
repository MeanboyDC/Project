const express = require('express')

const Router = express.Router()


const {
    selectBook, 
    showBooks,
    deleteBook,
    verifyJWT
} = require('../controller/select.controller.js')

Router.post('/select', verifyJWT, selectBook)
Router.get('/show', verifyJWT, showBooks)
Router.delete('/show/:id', verifyJWT, deleteBook)

  
module.exports = Router;

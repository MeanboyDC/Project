const express = require('express')
const mongoose = require('mongoose')
const UserRouter = require('./routes/user.route.js')
const UserMod = require('./models/authmodel.js')

const Router = require('./routes/book.route.js')
const cors = require('cors')
const Book = require('./models/bookmodel.js')
const SelectRouter = require('./routes/select.route.js')
require('dotenv').config()


const user = process.env.USER_ROUTE
const book = process.env.BOOK_ROUTE
const select = process.env.SELECT_ROUTE
const mongodb = process.env.MONGODB_URL


const app = express ()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors())

app.get('/', (req, res)=>{
    res.send('welcome to backend')
}
)

app.use(book, Router)
// app.use('/api/book/', UserRouter)
app.use(user, UserRouter)
app.use(select, SelectRouter)


mongoose.connect(mongodb)
.then(()=>{
    console.log('Connection Successful')
    app.listen(3001, (req, res)=>{
        console.log('Server is running on port 3001')
    })
})
.catch(()=>{
    console.log('Conncetion Failed')
}) 

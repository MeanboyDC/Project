const express = require('express')
const mongoose = require('mongoose')
const UserRouter = require('../backend/routes/user.route.js')
const UserMod = require('../backend/models/authmodel.js')

const Router = require('../backend/routes/book.route.js')
const cors = require('cors')
const Book = require('./models/bookmodel.js')
const SelectRouter = require('../backend/routes/select.route.js')

const app = express ()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors())

app.get('/', (req, res)=>{
    res.send('welcome to backend')
}
)

app.use('/api/book', Router)
// app.use('/api/book/', UserRouter)
app.use('/auth/book', UserRouter)
app.use('/book', SelectRouter)


mongoose.connect("mongodb+srv://adebow23:RzZrCXxDEvVulFh8@cluster0.59lumdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('Connection Successful')
    app.listen(3001, (req, res)=>{
        console.log('Server is running on port 3001')
    })
})
.catch(()=>{
    console.log('Conncetion Failed')
}) 